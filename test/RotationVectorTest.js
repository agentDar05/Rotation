// import assert from "assert";
// // import RotationVector from "../src/js/RotationVector.js";
// import Vector from "../src/js/Vector.js";
// import Matrix from "../src/js/Matrix.js";
// import rotationMatrix from "../src/js/rotateHouse.js";
// import { it } from "node:test";
// import { describe } from "mocha";
// import StaticMath from "../src/js/StaticMath.js";

// describe("#rotateByXAxis", () => {
//   it("should rotate an empty matrix", () => {
//     const emptyMatrix = Matrix.fromRowsArray([]);
//     const rotatedMatrix = rotationMatrix(emptyMatrix, 90);
//     assert.deepStrictEqual(rotatedMatrix.asArray(), []);
//   });

//   it("should rotate a matrix with one vector", () => {
//     const matrix = Matrix.fromRowsArray([[1], [2], [3]]);
//     const rotatedMatrix = rotationMatrix(matrix, 90);
//     StaticMath.assertVectorsEqual(
//       rotatedMatrix.getCol(0),
//       new Vector([1, -3, 2])
//     );
//   });

//   it("should rotate a matrix with multiple vectors", () => {
//     const matrix = Matrix.fromRowsArray([
//       [1, 2, 3],
//       [4, 5, 6],
//       [7, 8, 9],
//     ]);
//     const rotatedMatrix = rotationMatrix(matrix, 90);
//     StaticMath.assertMatrixEqual(
//       rotatedMatrix,
//       Matrix.fromRowsArray([
//         [1, 3, -2],
//         [4, 6, -5],
//         [7, 9, -8],
//       ])
//     );
//   });
// });
