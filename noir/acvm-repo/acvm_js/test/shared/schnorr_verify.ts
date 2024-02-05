// See `schnorr_verify_circuit` integration test in `acir/tests/test_program_serialization.rs`.
export const bytecode = Uint8Array.from([
  31, 139, 8, 0, 0, 0, 0, 0, 0, 255, 77, 210, 233, 50, 66, 1, 24, 199, 225, 99, 223, 247, 125, 223, 146, 36, 73, 146,
  36, 73, 146, 132, 187, 112, 255, 151, 96, 244, 78, 79, 198, 153, 57, 243, 212, 244, 165, 121, 255, 191, 239, 36, 73,
  134, 146, 254, 19, 142, 243, 167, 247, 14, 179, 225, 247, 145, 222, 59, 217, 123, 71, 57, 198, 113, 78, 112, 240, 78,
  113, 154, 51, 156, 229, 28, 231, 185, 192, 69, 46, 113, 153, 43, 92, 229, 26, 215, 185, 193, 77, 110, 113, 155, 59,
  220, 229, 30, 247, 121, 192, 67, 30, 241, 152, 39, 76, 241, 148, 105, 158, 49, 195, 115, 102, 121, 193, 28, 47, 153,
  231, 21, 11, 188, 102, 145, 55, 44, 241, 150, 101, 222, 177, 194, 123, 86, 249, 192, 26, 31, 89, 231, 19, 27, 124,
  102, 243, 223, 142, 241, 188, 248, 222, 226, 43, 219, 124, 99, 135, 239, 236, 242, 131, 159, 252, 242, 57, 158, 104,
  47, 186, 139, 214, 162, 179, 104, 44, 250, 26, 180, 53, 229, 127, 68, 75, 209, 81, 52, 20, 253, 68, 59, 209, 77, 52,
  19, 189, 68, 43, 209, 73, 52, 18, 125, 68, 27, 209, 69, 52, 17, 61, 68, 11, 209, 65, 52, 16, 251, 199, 246, 135, 73,
  127, 243, 216, 59, 182, 78, 217, 56, 109, 219, 140, 77, 179, 182, 204, 217, 48, 111, 187, 130, 205, 138, 182, 42, 217,
  168, 108, 155, 138, 77, 170, 182, 168, 217, 160, 238, 246, 13, 55, 111, 186, 113, 203, 109, 219, 110, 218, 113, 203,
  174, 27, 14, 110, 54, 184, 91, 226, 150, 127, 207, 47, 78, 22, 245, 106, 221, 3, 0, 0,
]);

export const initialWitnessMap = new Map([
  [1, '0x04b260954662e97f00cab9adb773a259097f7a274b83b113532bce27fa3fb96a'],
  [2, '0x2fd51571db6c08666b0edfbfbc57d432068bccd0110a39b166ab243da0037197'],
  [3, '0x000000000000000000000000000000000000000000000000000000000000002e'],
  [4, '0x00000000000000000000000000000000000000000000000000000000000000ce'],
  [5, '0x0000000000000000000000000000000000000000000000000000000000000052'],
  [6, '0x00000000000000000000000000000000000000000000000000000000000000aa'],
  [7, '0x0000000000000000000000000000000000000000000000000000000000000087'],
  [8, '0x000000000000000000000000000000000000000000000000000000000000002a'],
  [9, '0x0000000000000000000000000000000000000000000000000000000000000049'],
  [10, '0x000000000000000000000000000000000000000000000000000000000000009d'],
  [11, '0x0000000000000000000000000000000000000000000000000000000000000050'],
  [12, '0x000000000000000000000000000000000000000000000000000000000000007c'],
  [13, '0x000000000000000000000000000000000000000000000000000000000000009a'],
  [14, '0x00000000000000000000000000000000000000000000000000000000000000aa'],
  [15, '0x00000000000000000000000000000000000000000000000000000000000000df'],
  [16, '0x0000000000000000000000000000000000000000000000000000000000000023'],
  [17, '0x0000000000000000000000000000000000000000000000000000000000000034'],
  [18, '0x0000000000000000000000000000000000000000000000000000000000000010'],
  [19, '0x000000000000000000000000000000000000000000000000000000000000008a'],
  [20, '0x0000000000000000000000000000000000000000000000000000000000000047'],
  [21, '0x0000000000000000000000000000000000000000000000000000000000000063'],
  [22, '0x00000000000000000000000000000000000000000000000000000000000000e8'],
  [23, '0x0000000000000000000000000000000000000000000000000000000000000037'],
  [24, '0x0000000000000000000000000000000000000000000000000000000000000054'],
  [25, '0x0000000000000000000000000000000000000000000000000000000000000096'],
  [26, '0x000000000000000000000000000000000000000000000000000000000000003e'],
  [27, '0x00000000000000000000000000000000000000000000000000000000000000d5'],
  [28, '0x00000000000000000000000000000000000000000000000000000000000000ae'],
  [29, '0x0000000000000000000000000000000000000000000000000000000000000024'],
  [30, '0x000000000000000000000000000000000000000000000000000000000000002d'],
  [31, '0x0000000000000000000000000000000000000000000000000000000000000020'],
  [32, '0x0000000000000000000000000000000000000000000000000000000000000080'],
  [33, '0x000000000000000000000000000000000000000000000000000000000000004d'],
  [34, '0x0000000000000000000000000000000000000000000000000000000000000047'],
  [35, '0x00000000000000000000000000000000000000000000000000000000000000a5'],
  [36, '0x00000000000000000000000000000000000000000000000000000000000000bb'],
  [37, '0x00000000000000000000000000000000000000000000000000000000000000f6'],
  [38, '0x00000000000000000000000000000000000000000000000000000000000000c3'],
  [39, '0x000000000000000000000000000000000000000000000000000000000000000b'],
  [40, '0x000000000000000000000000000000000000000000000000000000000000003b'],
  [41, '0x0000000000000000000000000000000000000000000000000000000000000065'],
  [42, '0x00000000000000000000000000000000000000000000000000000000000000c9'],
  [43, '0x0000000000000000000000000000000000000000000000000000000000000001'],
  [44, '0x0000000000000000000000000000000000000000000000000000000000000085'],
  [45, '0x0000000000000000000000000000000000000000000000000000000000000006'],
  [46, '0x000000000000000000000000000000000000000000000000000000000000009e'],
  [47, '0x000000000000000000000000000000000000000000000000000000000000002f'],
  [48, '0x0000000000000000000000000000000000000000000000000000000000000010'],
  [49, '0x00000000000000000000000000000000000000000000000000000000000000e6'],
  [50, '0x0000000000000000000000000000000000000000000000000000000000000030'],
  [51, '0x000000000000000000000000000000000000000000000000000000000000004a'],
  [52, '0x0000000000000000000000000000000000000000000000000000000000000018'],
  [53, '0x000000000000000000000000000000000000000000000000000000000000007c'],
  [54, '0x00000000000000000000000000000000000000000000000000000000000000d0'],
  [55, '0x00000000000000000000000000000000000000000000000000000000000000ab'],
  [56, '0x0000000000000000000000000000000000000000000000000000000000000031'],
  [57, '0x00000000000000000000000000000000000000000000000000000000000000d5'],
  [58, '0x0000000000000000000000000000000000000000000000000000000000000063'],
  [59, '0x0000000000000000000000000000000000000000000000000000000000000084'],
  [60, '0x00000000000000000000000000000000000000000000000000000000000000a3'],
  [61, '0x00000000000000000000000000000000000000000000000000000000000000a6'],
  [62, '0x00000000000000000000000000000000000000000000000000000000000000d5'],
  [63, '0x0000000000000000000000000000000000000000000000000000000000000091'],
  [64, '0x000000000000000000000000000000000000000000000000000000000000000d'],
  [65, '0x000000000000000000000000000000000000000000000000000000000000009c'],
  [66, '0x00000000000000000000000000000000000000000000000000000000000000f9'],
  [67, '0x0000000000000000000000000000000000000000000000000000000000000000'],
  [68, '0x0000000000000000000000000000000000000000000000000000000000000001'],
  [69, '0x0000000000000000000000000000000000000000000000000000000000000002'],
  [70, '0x0000000000000000000000000000000000000000000000000000000000000003'],
  [71, '0x0000000000000000000000000000000000000000000000000000000000000004'],
  [72, '0x0000000000000000000000000000000000000000000000000000000000000005'],
  [73, '0x0000000000000000000000000000000000000000000000000000000000000006'],
  [74, '0x0000000000000000000000000000000000000000000000000000000000000007'],
  [75, '0x0000000000000000000000000000000000000000000000000000000000000008'],
  [76, '0x0000000000000000000000000000000000000000000000000000000000000009'],
]);

export const expectedWitnessMap = new Map(initialWitnessMap).set(
  77,
  '0x0000000000000000000000000000000000000000000000000000000000000001',
);
