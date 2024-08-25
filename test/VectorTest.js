import assert from "assert";
import Vector from "../src/js/Vector.js";
import { it } from "node:test";
import StaticMath from "../src/js/StaticMath.js";
import AssertUtils from "../src/js/AssertUtils.js";
describe("Vector", () => {
  describe("dimensions", () => {
    it("returns dimensions of vector", () => {
      const expected = 5;
      const exact = new Vector([5, 0, 1, 6, 2]).dimensions;
      assert.deepStrictEqual(exact, expected);
    });
  });
  describe("#negate", () => {
    it("negates vector components", () => {
      const actual = new Vector([5, 0, -1]);
      const expected = new Vector([-5, 0, 1]);
      AssertUtils.assertVectorsEqual(actual.negate(), expected);
    });
  });
  describe("#projectOn", () => {
    it("returns projection", () => {
      const a = new Vector([2, 3]); // 2 3
      const b = new Vector([2, 1]); // 2 1
      assert.deepStrictEqual(a.projectOn(b), new Vector([2.8, 1.4]));
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
  describe("#vectorToArrayOfStrings", () => {
    it("returns vector in stroke", () => {
      const vector = new Vector([1, 2, 3]);
      assert.deepStrictEqual(vector.vectorToArrayOfStrings(), ["1", "2", "3"]);
    });
  });
  describe("#add", () => {
    it("adds two vectors", () => {
      const a = new Vector([1, 0, 1]);
      const b = new Vector([0, 2, 0]);
      const expected = new Vector([1, 2, 1]);
      assert.deepStrictEqual(a.add(b).asArray(), expected.asArray());
    });
  });
  describe("projectOnYZ", () => {
    it("projects the vector on plane yz", () => {
      const v = new Vector([1, 2, 3]);
      const v1 = new Vector([0, 2, 0]);
      AssertUtils.assertVectorsEqual(v.projectOnYZ(), new Vector([0, 2, 3]));
      AssertUtils.assertVectorsEqual(v1.projectOnYZ(), new Vector([0, 2, 0]));
    });
    it("returns empty vector if vector is empty", () => {
      const v = new Vector([]);
      AssertUtils.assertVectorsEqual(v.projectOnYZ(), new Vector([]));
    });
  });
});
