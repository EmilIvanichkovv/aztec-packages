import { AztecAddress, CallContext, EthAddress, FunctionData, FunctionSelector, Header } from '@aztec/circuits.js';
import { makeHeader } from '@aztec/circuits.js/testing';
import { Fr } from '@aztec/foundation/fields';
import { AvmTestContractArtifact } from '@aztec/noir-contracts.js';

import { MockProxy, mock } from 'jest-mock-extended';

import { CommitmentsDB, PublicContractsDB, PublicStateDB } from './db.js';
import { PublicExecution } from './execution.js';
import { PublicExecutor } from './executor.js';

describe('AVM WitGen and Proof Generation', () => {
  let publicState: MockProxy<PublicStateDB>;
  let publicContracts: MockProxy<PublicContractsDB>;
  let commitmentsDb: MockProxy<CommitmentsDB>;
  let header: Header;

  const callContext = CallContext.from({
    msgSender: AztecAddress.random(),
    storageContractAddress: AztecAddress.random(),
    portalContractAddress: EthAddress.random(),
    functionSelector: FunctionSelector.empty(),
    isContractDeployment: false,
    isDelegateCall: false,
    isStaticCall: false,
    startSideEffectCounter: 0,
  });
  const contractAddress = AztecAddress.random();

  beforeEach(() => {
    publicState = mock<PublicStateDB>();
    publicContracts = mock<PublicContractsDB>();
    commitmentsDb = mock<CommitmentsDB>();

    const randomInt = Math.floor(Math.random() * 1000000);
    header = makeHeader(randomInt);
  }, 10000);

  it('Should prove valid execution of bytecode that performs addition', async () => {
    const args: Fr[] = [new Fr(1), new Fr(2)];
    // Bytecode for the following contract is encoded:
    // const bytecode = encodeToBytecode([
    //    new CalldataCopy(/*indirect=*/ 0, /*cdOffset=*/ 0, /*copySize=*/ 2, /*dstOffset=*/ 0),
    //    new Add(/*indirect=*/ 0, TypeTag.FIELD, /*aOffset=*/ 0, /*bOffset=*/ 1, /*dstOffset=*/ 2),
    //    new Return(/*indirect=*/ 0, /*returnOffset=*/ 2, /*copySize=*/ 1),
    // ]);
    const bytecode: Buffer = Buffer.from('HwAAAAAAAAAAAgAAAAAAAAYAAAAAAAAAAQAAAAI3AAAAAAIAAAAB', 'base64');
    publicContracts.getBytecode.mockResolvedValue(bytecode);
    const executor = new PublicExecutor(publicState, publicContracts, commitmentsDb, header);
    const functionData = FunctionData.empty();
    const execution: PublicExecution = { contractAddress, functionData, args, callContext };
    const [proof, vk] = await executor.getAvmProof(execution);
    const valid = await executor.verifyAvmProof(vk, proof);
    expect(valid).toBe(true);
  });

  // This is skipped as we require MOV to be implemented in the AVM
  it.skip('Should prove valid execution contract function that performs addition', async () => {
    const args: Fr[] = [new Fr(1), new Fr(2)];

    const addArtifact = AvmTestContractArtifact.functions.find(f => f.name === 'avm_addArgsReturn')!;
    const bytecode = Buffer.from(addArtifact.bytecode, 'base64');
    publicContracts.getBytecode.mockResolvedValue(bytecode);
    const functionData = FunctionData.fromAbi(addArtifact);
    const execution: PublicExecution = { contractAddress, functionData, args, callContext };

    const executor = new PublicExecutor(publicState, publicContracts, commitmentsDb, header);
    const [proof, vk] = await executor.getAvmProof(execution);
    const valid = await executor.verifyAvmProof(vk, proof);
    expect(valid).toBe(true);
  });
});
