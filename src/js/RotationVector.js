import Matrix from "./Matrix.js";

export default class RotationVector {
  vector;
  constructor(vector) {
    this.vector = vector;
  }
  rotateAroundXAxis(angleInRad) {
    const cos = Math.cos(angleInRad);
    const sin = Math.sin(angleInRad);
    const matrix = Matrix.fromRowsArray([
      [1, 0, 0],
      [0, cos, -sin],
      [0, sin, cos],
    ]);
    return matrix.multiplyOnVector(this.vector);
  }
  rotateAroundZAxis(angleInRad) {
    const cos = Math.cos(angleInRad);
    const sin = Math.sin(angleInRad);
    const matrix = Matrix.fromRowsArray([
      [cos, -sin, 0],
      [sin, cos, 0],
      [0, 0, 1],
    ]);
    return matrix.multiplyOnVector(this.vector);
  }
  rotateAroundYAxis(angleInRad) {
    const cos = Math.cos(angleInRad);
    const sin = Math.sin(angleInRad);
    const matrix = Matrix.fromRowsArray([
      [cos, 0, sin],
      [0, 1, 0],
      [-sin, 0, cos],
    ]);
    return matrix.multiplyOnVector(this.vector);
  }
  rotateVector(angleX, angleY, angleZ) {
    return this.rotateAroundXAxis(angleX).dot(
      this.rotateAroundYAxis(angleY).dot(
      this.rotateAroundZAxis(angleZ))
    );
  }
}
