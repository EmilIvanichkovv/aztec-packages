import { WitnessMap, StackItem, WitnessStack } from '@noir-lang/acvm_js';

// See `nested_acir_call_circuit` integration test in `acir/tests/test_program_serialization.rs`.
export const bytecode = Uint8Array.from([
  31, 139, 8, 0, 0, 0, 0, 0, 0, 255, 213, 83, 65, 14, 3, 33, 8, 68, 77, 246, 61, 32, 186, 139, 183, 126, 165, 166, 238,
  255, 159, 208, 109, 74, 82, 229, 178, 135, 186, 77, 58, 201, 4, 195, 97, 128, 1, 3, 188, 17, 148, 47, 44, 7, 221, 65,
  15, 31, 56, 37, 104, 222, 129, 193, 77, 35, 126, 7, 58, 43, 30, 174, 44, 222, 107, 250, 201, 218, 190, 211, 98, 92,
  83, 106, 91, 108, 196, 116, 199, 88, 170, 100, 76, 185, 174, 66, 66, 89, 242, 35, 10, 115, 147, 36, 91, 169, 101, 195,
  66, 137, 27, 237, 185, 240, 174, 98, 97, 94, 95, 8, 198, 80, 103, 226, 128, 0, 227, 102, 174, 50, 11, 38, 154, 229,
  231, 245, 21, 23, 157, 213, 119, 115, 255, 244, 58, 237, 183, 176, 239, 0, 38, 233, 254, 108, 91, 14, 230, 158, 246,
  153, 97, 3, 158, 188, 79, 135, 232, 14, 5, 0, 0,
]);

export const initialWitnessMap: WitnessMap = new Map([
  [0, '0x0000000000000000000000000000000000000000000000000000000000000008'],
  [1, '0x000000000000000000000000000000000000000000000000000000000000000a'],
]);

const inner_call_witness: StackItem = {
  index: 2,
  witness: new Map([
    [0, '0x000000000000000000000000000000000000000000000000000000000000000a'],
    [1, '0x000000000000000000000000000000000000000000000000000000000000000a'],
  ]),
};

const nested_call_witness: StackItem = {
  index: 1,
  witness: new Map([
    [0, '0x0000000000000000000000000000000000000000000000000000000000000008'],
    [1, '0x000000000000000000000000000000000000000000000000000000000000000a'],
    [2, '0x000000000000000000000000000000000000000000000000000000000000000a'],
    [3, '0x000000000000000000000000000000000000000000000000000000000000000a'],
  ]),
};

const main_witness: StackItem = {
  index: 0,
  witness: new Map([
    [0, '0x0000000000000000000000000000000000000000000000000000000000000008'],
    [1, '0x000000000000000000000000000000000000000000000000000000000000000a'],
    [2, '0x000000000000000000000000000000000000000000000000000000000000000a'],
    [3, '0x000000000000000000000000000000000000000000000000000000000000000a'],
  ]),
};

export const expectedWitnessStack: WitnessStack = [
  inner_call_witness,
  nested_call_witness,
  inner_call_witness,
  nested_call_witness,
  main_witness,
];

export const expectedCompressedWitnessStack = Uint8Array.from([
  31, 139, 8, 0, 0, 0, 0, 0, 2, 255, 237, 145, 177, 13, 0, 32, 8, 4, 17, 117, 31, 75, 75, 87, 113, 255, 37, 44, 196, 5,
  228, 42, 194, 39, 132, 238, 114, 249, 239, 114, 163, 118, 47, 203, 254, 240, 101, 23, 152, 213, 120, 199, 73, 58, 42,
  200, 170, 176, 87, 238, 27, 119, 95, 201, 238, 190, 89, 7, 37, 195, 196, 176, 4, 5, 0, 0,
]);
