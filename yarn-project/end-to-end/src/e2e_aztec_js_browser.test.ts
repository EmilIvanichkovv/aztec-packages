/* eslint-disable no-console */
import * as AztecJs from '@aztec/aztec.js';
import { AztecAddress, PrivateKey } from '@aztec/circuits.js';
import { DebugLogger, createDebugLogger } from '@aztec/foundation/log';
import { PrivateTokenContractAbi } from '@aztec/noir-contracts/artifacts';

import { Server } from 'http';
import Koa from 'koa';
import serve from 'koa-static';
import path, { dirname } from 'path';
import { Browser, Page, launch } from 'puppeteer';
import { fileURLToPath } from 'url';

declare global {
  interface Window {
    AztecJs: typeof AztecJs;
  }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = 3000;

const { SANDBOX_URL } = process.env;

const conditionalDescribe = () => (SANDBOX_URL ? describe : describe.skip);
const privKey = PrivateKey.random();

conditionalDescribe()('e2e_aztec.js_browser', () => {
  const initialBalance = 33n;
  const transferAmount = 3n;

  let contractAddress: AztecAddress;

  let logger: DebugLogger;
  let pageLogger: DebugLogger;
  let app: Koa;
  let testClient: AztecJs.AztecRPC;
  let server: Server;

  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    testClient = AztecJs.createAztecRpcClient(SANDBOX_URL!, AztecJs.mustSucceedFetch);
    await AztecJs.waitForSandbox(testClient);

    app = new Koa();
    app.use(serve(path.resolve(__dirname, './web')));
    server = app.listen(PORT, () => {
      logger(`Server started at http://localhost:${PORT}`);
    });

    logger = createDebugLogger('aztec:aztec.js:web');
    pageLogger = createDebugLogger('aztec:aztec.js:web:page');

    browser = await launch({
      executablePath: process.env.CHROME_BIN,
      headless: 'new',
      args: [
        '--allow-file-access-from-files',
        '--no-sandbox',
        '--headless',
        '--disable-web-security',
        '--disable-features=IsolateOrigins',
        '--disable-site-isolation-trials',
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--disk-cache-dir=/dev/null',
      ],
    });
    page = await browser.newPage();
    page.on('console', msg => {
      pageLogger(msg.text());
    });
    page.on('pageerror', err => {
      pageLogger.error(err.toString());
    });
    await page.goto(`http://localhost:${PORT}/index.html`);
  }, 120_000);

  afterAll(async () => {
    await browser.close();
    server.close();
  });

  it('Loads Aztec.js in the browser', async () => {
    const createAccountsExists = await page.evaluate(() => {
      const { createAccounts } = window.AztecJs;
      return typeof createAccounts === 'function';
    });
    expect(createAccountsExists).toBe(true);
  });

  it('Creates an account', async () => {
    const result = await page.evaluate(
      async (rpcUrl, privateKeyString) => {
        const { PrivateKey, createAztecRpcClient, mustSucceedFetch, getUnsafeSchnorrAccount } = window.AztecJs;
        const client = createAztecRpcClient(rpcUrl!, mustSucceedFetch);
        const privateKey = PrivateKey.fromString(privateKeyString);
        const account = getUnsafeSchnorrAccount(client, privateKey);
        await account.waitDeploy();
        const completeAddress = await account.getCompleteAddress();
        const addressString = completeAddress.address.toString();
        console.log(`Created Account: ${addressString}`);
        return addressString;
      },
      SANDBOX_URL,
      privKey.toString(),
    );
    const accounts = await testClient.getAccounts();
    const stringAccounts = accounts.map(acc => acc.toString());
    expect(stringAccounts.includes(result)).toBeTruthy();
  });

  it('Deploys Private Token contract', async () => {
    const txHash = await page.evaluate(
      async (rpcUrl, initialBalance, PrivateTokenContractAbi) => {
        const { DeployMethod, createAztecRpcClient, mustSucceedFetch } = window.AztecJs;
        const client = createAztecRpcClient(rpcUrl!, mustSucceedFetch);
        const owner = (await client.getAccounts())[0];
        const publicKey = (await client.getPublicKeyAndPartialAddress(owner))[0];
        const tx = new DeployMethod(publicKey, client, PrivateTokenContractAbi, [initialBalance, owner]).send();
        await tx.wait();
        const receipt = await tx.getReceipt();
        console.log(`Contract Deployed: ${receipt.contractAddress}`);
        return receipt.txHash.toString();
      },
      SANDBOX_URL,
      initialBalance,
      PrivateTokenContractAbi,
    );

    const txResult = await testClient.getTxReceipt(AztecJs.TxHash.fromString(txHash));
    expect(txResult.status).toEqual(AztecJs.TxStatus.MINED);
    contractAddress = txResult.contractAddress!;
  }, 30_000);

  it("Gets the owner's balance", async () => {
    const result = await page.evaluate(
      async (rpcUrl, contractAddress, PrivateTokenContractAbi) => {
        const { Contract, AztecAddress, createAztecRpcClient, mustSucceedFetch } = window.AztecJs;
        const client = createAztecRpcClient(rpcUrl!, mustSucceedFetch);
        const [owner] = await client.getAccounts();
        const wallet = await AztecJs.getSandboxAccountsWallet(client);
        const contract = await Contract.create(
          AztecAddress.fromString(contractAddress),
          PrivateTokenContractAbi,
          wallet,
        );
        const balance = await contract.methods.getBalance(owner).view({ from: owner });
        return balance;
      },
      SANDBOX_URL,
      contractAddress.toString(),
      PrivateTokenContractAbi,
    );
    logger('Owner balance:', result);
    expect(result).toEqual(initialBalance);
  });

  it('Sends a transfer TX', async () => {
    const result = await page.evaluate(
      async (rpcUrl, contractAddress, transferAmount, PrivateTokenContractAbi) => {
        console.log(`Starting transfer tx`);
        const { AztecAddress, Contract, createAztecRpcClient, mustSucceedFetch } = window.AztecJs;
        const client = createAztecRpcClient(rpcUrl!, mustSucceedFetch);
        const [owner, receiver] = await client.getAccounts();
        const wallet = await AztecJs.getSandboxAccountsWallet(client);
        const contract = await Contract.create(
          AztecAddress.fromString(contractAddress),
          PrivateTokenContractAbi,
          wallet,
        );
        await contract.methods.transfer(transferAmount, owner, receiver).send({ origin: owner }).wait();
        console.log(`Transfered ${transferAmount} tokens to new Account`);
        return await contract.methods.getBalance(receiver).view({ from: receiver });
      },
      SANDBOX_URL,
      contractAddress.toString(),
      transferAmount,
      PrivateTokenContractAbi,
    );
    expect(result).toEqual(transferAmount);
  }, 60_000);
});
