import assert from "assert";
// import RotationVector from "../src/js/RotationVector.js";
import Vector from "../src/js/Vector.js";
import Matrix from "../src/js/Matrix.js";
import { it } from "node:test";
import { describe } from "mocha";
import StaticMath from "../src/js/StaticMath.js";
import RotationVector from "../src/js/RotationVector.js";
import AssertUtils from "../src/js/AssertUtils.js";

describe("RotationVector", () => {
  describe("#getRotationMatrix", ()=>{
    it("returns rotation matrix", ()=>{
        /*
        vector:
       [1
        2 
        3]
        angles:
        x: 30
        y: 0
        z: 45
        */
       const matrixX = Matrix.fromRowsArray([
        [1, 0, 0],
        [0, 0.8660252915835662, -0.5000001943375613],
        [0, 0.5000001943375613, 0.8660252915835662]
       ])
       const matrixY = Matrix.fromRowsArray([
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
       ])
       const matrixZ = Matrix.fromRowsArray([
        [0.7071068967259818, -0.7071066656470943, 0],
        [0.7071066656470943, 0.7071068967259818,  0 ],
        [0,0,1 ]
       ])
       AssertUtils.assertMatrixEqual(matrixX, RotationVector.getRotationMatrix(0.523599, 0,0))
       AssertUtils.assertMatrixEqual(matrixY, RotationVector.getRotationMatrix(0, 0,0))
       AssertUtils.assertMatrixEqual(matrixZ, RotationVector.getRotationMatrix(0, 0,0.785398))
       const matrix = matrixX.matrixMultiply(matrixY.matrixMultiply(matrixZ))
       AssertUtils.assertMatrixEqual(matrix, RotationVector.getRotationMatrix(0.523599, 0, 0.785398))
    })
  })
});
