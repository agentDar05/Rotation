import assert from "assert";
import Matrix from "../src/js/Matrix.js";
import Vector from "../src/js/Vector.js";
import { it } from "node:test";
import { describe } from "mocha";

describe("Matrix", () => {
  describe("#addSpaces", () => {
    it("adds spaces", () => {
      assert.deepStrictEqual(new Vector([1,2,3]).addSpaces(2, 3), '3   ');
      assert.deepStrictEqual(new Vector([2,1,9]).addSpaces(1, 0), "1");
    })
  })
  describe("#multiplyByVector", () => {
    it("throws an error if incorrect size", () => {
      // add code
      const matrix = new Matrix([
        new Vector([5, 3, 6]),
        new Vector([3, 8, 7]),
        new Vector([9, 5, 2]),
        new Vector([1, 0, 0]),
      ]);
      const vector = new Vector([4, 3, 2]);
      assert.throws(
        () => {
          matrix.multiplyOnVector(vector);
        },
        {
          message: "matrix and vector have incompatible dimensions: 3x4 and 3",
        }
      );
    });

    it("multiplying by vector", () => {
      const matrix = new Matrix([
        new Vector([5, 3, 6]),
        new Vector([3, 8, 7]),
        new Vector([9, 5, 2]),
      ]);
      const vector = new Vector([4, 3, 2]);
      assert.deepStrictEqual(
        matrix.multiplyOnVector(vector),
        new Vector([47, 46, 49])
      );
    });
  });
});
describe("#dimensions", () => {
  it("returns dimensions of matrix", () => {
    const matrix = new Matrix([
      new Vector([5, 3, 6]),
      new Vector([3, 8, 7]),
      new Vector([9, 5, 2]),
      new Vector([1, 0, 0]),
    ]);
    const expected = [3, 4];
    const matrix1 = new Matrix([
      new Vector([5, 3]),
      new Vector([3, 8]),
      new Vector([9, 5]),
      new Vector([1, 0]),
      new Vector([5, 3]),
      new Vector([3, 8]),
      new Vector([9, 5]),
      new Vector([1, 0]),
      new Vector([5, 3]),
      new Vector([3, 8]),
      new Vector([9, 5]),
      new Vector([1, 0]),
    ]);
    const expected1 = [2, 12];
    assert.deepStrictEqual(matrix.dimensions(), expected);
    assert.deepStrictEqual(matrix1.dimensions(), expected1);
  });
  describe("transpose", () => {
    it("transposes matrix", () => {
      const m = new Matrix([
        new Vector([1, 2, 3]),
        new Vector([4, 5, 6]),
        new Vector([7, 8, 9]),
      ]);
      const expected = new Matrix([
        new Vector([1, 4, 7]),
        new Vector([2, 5, 8]),
        new Vector([3, 6, 9]),
      ]);
      assert.deepStrictEqual(m.transpose(), expected);
    });
  });
  describe("toString", () => {
    it("returns matrix in string", () => {
      const m = new Matrix([
        new Vector([1, 20, 3]),
        new Vector([4, 5, 6]),
        new Vector([7, 8, 9]),
      ]);
      console.log(m.toString())
      const expected = "1  4 7 \n20 5 8 \n3  6 9 "
      assert.deepStrictEqual(m.toString(), expected);
    });
  });
  describe("#multiplyByMatrix", () => {
    it("can multiply matrix by matrix", () => {
      const matrix = new Matrix([
        new Vector([0, 2, 6]),
        new Vector([-1, 7, -6]),
        new Vector([2, 3, 11]),
      ]);
      const matrix1 = new Matrix([
        new Vector([0, 4, 9]),
        new Vector([-1, 8, -3]),
        new Vector([2, 4, 13]),
      ]);
      const output = matrix.multiplyByMatrix(matrix1);
      console.log(output.toString())
    })
    it("can multiply 2x2 matrix by 1x2 matrix", () => {
      const matrix = Matrix.fromRows([
        new Vector([2,1]),
        new Vector([1, 0])
      ])
      const matrix1 =Matrix.fromRows([
        new Vector([]),
       new Vector([])
        
      ]);
      const output = matrix.multiplyByMatrix(matrix1);
      console.log(output.toString());
    });
  })
  describe("fromRows", () => {
    it("")
  })
  describe("#height", () => {
    it(
      ("returns height",
      () => {
        const matrix = new Matrix([
          new Vector([0, 0, 1]),
          new Vector([0, 0, 1]),
          new Vector([0, 0, 1]),
          new Vector([0, 0, 1]),
        ]);
        const expected = 3;
        assert.deepStrictEqual(matrix.height, expected);
      })
    );
  });
  describe("#width", () => {
    it(
      ("returns width",
      () => {
        const matrix = new Matrix([
          new Vector([0, 0, 1]),
          new Vector([0, 0, 1]),
          new Vector([0, 0, 1]),
          new Vector([0, 0, 1]),
        ]);
        const expected = 4;
        assert.deepStrictEqual(matrix.width, expected);
      })
    );
  });
});
