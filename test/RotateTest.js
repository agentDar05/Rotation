import Matrix from "../src/js/Matrix.js";
import {it} from "node:test";
import {describe} from "mocha";
import Rotate from "../src/js/Rotate.js";
import AssertUtils from "../src/js/AssertUtils.js";

describe("Rotate", () => {
  describe("#getRotationMatrix", ()=>{
    it("returns rotation matrix", ()=>{
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
       AssertUtils.assertMatrixEqual(matrixX, Rotate.getRotationMatrix(0.523599, 0,0))
       AssertUtils.assertMatrixEqual(matrixY, Rotate.getRotationMatrix(0, 0,0))
       AssertUtils.assertMatrixEqual(matrixZ, Rotate.getRotationMatrix(0, 0,0.785398))
       const matrix = matrixX.matrixMultiply(matrixY.matrixMultiply(matrixZ))
       AssertUtils.assertMatrixEqual(matrix, Rotate.getRotationMatrix(0.523599, 0, 0.785398))
    })
  })
});
