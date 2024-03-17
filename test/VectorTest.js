import assert from "assert";
import Vector from "../src/js/Vector.js";
import { it } from "node:test";
import Matrix from "../src/js/Matrix.js";
describe("Vector", () => {
  describe("#add", () => {
    it("adds two vectors", () => {
      const a = new Vector([1, 1, 1]);
      const b = new Vector([0, 1, 0]);
      const expected = new Vector([1, 2, 1]);
      assert.deepStrictEqual(a.add(b).asArray(), expected.asArray());
    });
  });
  describe("#vectorToArrayOfStrings", () => {
    it("returns vector in stroke", () => {
      const vector = new Vector([1, 2, 3]);
      console.log(vector.vectorToArrayOfStrings());

      assert.deepStrictEqual(vector.vectorToArrayOfStrings(), [
        "1",
        "2",
        "3",
      ]);
    });
  });
  describe("#dot", () => {
    it("throws error when dimensions are different", () => {
      const a = new Vector([1, 0, 2]);
      const b = new Vector([0, 2]);
      assert.throws(
        () => {
          a.dot(b);
        },
        { message: "Vectors must have the same size" }
      );
    });
    it("multiplies negative vector by positive vector", () => {
      const a = new Vector([-5, -3, -7]);
      const b = new Vector([2, 4, 6]);
      assert.strictEqual(a.dot(b), -10 + -12 + -42);
    });
    it("multiplies negative vector by negative vector", () => {
      const a = new Vector([-5, -3, -7]);
      const b = new Vector([-2, -4, -6]);
      assert.strictEqual(a.dot(b), 10 + 12 + 42);
    });
    it("multiplies positive vector by positive vector", () => {
      const a = new Vector([-5, -3, -7]);
      const b = new Vector([-2, -4, -6]);
      assert.strictEqual(a.dot(b), 10 + 12 + 42);
    });
    it("multiplies zero vector by zero vector", () => {
      const a = new Vector([0, 0, 0]);
      const b = new Vector([0, 0, 0]);
      assert.strictEqual(a.dot(b), 0);
    });
  });
  describe("dimensions", () => {
    it("returns dimensions of vector", () => {
      const expected = 5;
      const exact = new Vector([5, 0, 1, 6, 2]).dimensions;
      assert.deepStrictEqual(exact, expected);
    });
  });
  describe("#canMultiplyOnVector", () => {
    it("returns true if m and v are of compatible dimensions", () => {
      const a = new Matrix([
        new Vector([1, 1, 1]),
        new Vector([2, 3, 5]),
        new Vector([2, 3, 5]),
      ]);
      const b = new Vector([0, 1, 0]);
      assert.ok(a.canMultiplyByVector(b));
    });
    it("returns false if m and v are not of compatible dimensions", () => {
      const a = new Matrix([new Vector([1, 1, 1]), new Vector([2, 3, 5])]);
      const b = new Vector([0, 1, 0]);
      assert.ok(a.canMultiplyByVector(b) === false);
    });
  });
});
