import assert from "assert";
import { it } from "node:test";
import Vector from "../src/js/Vector.js";
import StaticMath from "../src/js/StaticMath.js";
import Matrix from "../src/js/Matrix.js";
describe("#assertMatrixEqual", () => {
  it("throws Error if matrices aren't equal", () => {
    const matrix1 = new Matrix([
      new Vector([1, 2, 3]),
      new Vector([3, 2, 1]),
      new Vector([4, 0, -1]),
    ]);

    const matrix2 = new Matrix([new Vector([3, 2]), new Vector([3, 2])]);
    let thrown = false;
    try {
      StaticMath.assertMatrixEqual(matrix1, matrix2, 0.01);
    } catch (error) {
      thrown = true;
    }
    assert.ok(thrown);
  });
  it("throws error if matrices aren't equal", () => {
    const e = Matrix.fromRowsArray([
      [1, 3, 2],
      [5, 0, -1],
      [5, 8, 0],
    ]);
    const a = Matrix.fromRowsArray([
      [1, 3, 2],
      [5, 9, -1],
      [5, 8, 0],
    ]);
    // assert.throws(
    //   () => {
    //     StaticMath.assertMatrixEqual(e, a, 0.1);
    //   },
    //   {
    //     message:
    //       `Matrices aren't equal in 1 column. Actual: ${a}, expected: ${e}`,
    //   }
    // );
  });
});

describe("#assertVectorsEqual", () => {
  it("throws Error if vectors don't have the same size", () => {
    const vector1 = new Vector([1, 2, 0]);
    const vector2 = new Vector([1, 2]);

    assert.throws(
      () => {
        StaticMath.assertVectorsEqual(vector1, vector2, 0.1);
      },
      { message: "Vectors must have the same dimensions" }
    );
  });
  it("throws Error if vector 2 is bigger than vector 1", () => {
    const vector1 = new Vector([0, 0]);
    const vector2 = new Vector([1, 0]);

    assert.throws(
      () => {
        StaticMath.assertVectorsEqual(vector1, vector2, 0.1);
      },

      { message: "Vectors aren't equal, vector 1: 0,0, vector 2: 1,0" }
    );
  });
  it("throws Error if dimensions of vector 1 are bigger than dimensions of vector 2", () => {
    const vector1 = new Vector([2, 0]);
    const vector2 = new Vector([1, -1]);

    assert.throws(
      () => {
        StaticMath.assertVectorsEqual(vector1, vector2, 0.1);
      },
      { message: "Vectors aren't equal, vector 1: 2,0, vector 2: 1,-1" }
    );
  });
  it("doesn't throw an error if the difference of 2 components of the vectors is not greater than the epsilon", () => {
    const vector1 = new Vector([2, 0]);
    const vector2 = new Vector([1.999, 0]);

    assert.doesNotThrow(() => {
      StaticMath.assertVectorsEqual(vector1, vector2, 0.001);
    });
  });
  describe("#rotationMatrix", () => {
    it("returns rotation matrix", () => {
      const matrixX = StaticMath.returnXMatrix(Math.PI / 9);
      const matrixY = StaticMath.returnYMatrix(Math.PI / 2);
      const matrixZ = StaticMath.returnZMatrix(Math.PI);
      const matrix = matrixZ.multiplyByMatrix(
        matrixX.multiplyByMatrix(matrixY)
      );
      StaticMath.assertMatrixEqual(
        StaticMath.rotationMatrix(Math.PI / 9, Math.PI / 2, Math.PI),
        matrix
      );
    });
  });
});
