import Vector from "./Vector.js";
import Matrix from "./Matrix.js";
export default class StaticMath {
  static degreesToRadians(degree) {
    return (degree * Math.PI) / 180;
  }
  static returnXMatrix(angleXRad) {
    const cos = Math.cos(angleXRad);
    const sin = Math.sin(angleXRad);
    return Matrix.fromRowsArray([
      [1, 0, 0],
      [0, cos, -sin],
      [0, sin, cos],
    ]);
  }
  static returnYMatrix(angleYRad) {
    return Matrix.fromRowsArray([
      [Math.cos(angleYRad), 0, Math.sin(angleYRad)],
      [0, 1, 0],
      [-Math.sin(angleYRad), 0, Math.cos(angleYRad)],
    ]);
  }
  static rotationMatrix(angleXInRad, angleYInRad, angleZInRad) {
    const matrixX = StaticMath.returnXMatrix(angleXInRad);
    const matrixY = StaticMath.returnYMatrix(angleYInRad);
    const matrixZ = StaticMath.returnZMatrix(angleZInRad);

    const matrix = matrixZ.multiplyByMatrix(matrixX.multiplyByMatrix(matrixY));
    return matrix;
  }
  static returnZMatrix(angleZRad) {
    return Matrix.fromRowsArray([
      [Math.cos(angleZRad), -Math.sin(angleZRad), 0],
      [Math.sin(angleZRad), Math.cos(angleZRad), 0],
      [0, 0, 1],
    ]);
  }
  /**
   *
   * @param {Vector} v1
   * @param {Vector} v2
   * @param {number} epsilon acceptable difference between 2 components of the Vectors
   * @returns
   */
  static assertVectorsEqual(v1, v2, epsilon) {
    if (v1.dimensions !== v2.dimensions)
      throw new Error("Vectors must have the same dimensions");
    for (let i = 0; i < v1.dimensions; i++) {
      if (Math.abs(v1.asArray()[i] - v2.asArray()[i]) >= epsilon)
        throw new Error(
          `Vectors aren't equal, vector 1: ${v1.asArray()}, vector 2: ${v2.asArray()}`
        );
    }
  }
  static isVectorsEqual(v1, v2, epsilon) {
    if (v1.dimensions !== v2.dimensions) {
      throw new Error(
        `Vectors must have the same dimensions, vector 1: ${v1.dimensions}, vector 2: ${v2.dimensions}`
      );
    }
    for (let i = 0; i < v1.dimensions; i++) {
      if (Math.abs(v1.asArray()[i] - v2.asArray()[i]) >= epsilon) return false;
    }
    return true;
  }
  static areArraysEqual(arr1, arr2) {
    if (arr1 === arr2) return true;
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) if (arr1[i] !== arr2[i]) return false;
    return true;
  }
  /**
   *
   * @param {Matrix} actual
   * @param {Matrix} expected
   * @param {number} epsilon
   */
  static assertMatrixEqual(actual, expected, epsilon = 1e-6) {
    if (typeof epsilon !== "number" || isNaN(epsilon) || !isFinite(epsilon))
      throw new Error(
        `Epsilon is not a number, actual: ${epsilon}, is number:${
          typeof epsilon === "number"
        }, is NaN: ${isNaN(epsilon)}, isFinite:${isFinite(epsilon)}`
      );
    if (!this.areArraysEqual(actual.dimensions, expected.dimensions))
      throw new Error(
        `Dimensions of matrices aren't the same: ${actual.dimensions}, ${expected.dimensions}`
      );
    for (let i = 0; i < actual.width; i++) {
      if (!this.isVectorsEqual(actual.getCol(i), expected.getCol(i), epsilon)) {
        throw new Error(
          `Matrices aren't equal in ${i} column. Actual: ${actual}, expected: ${expected}`
        );
      }
    }
  }
}
