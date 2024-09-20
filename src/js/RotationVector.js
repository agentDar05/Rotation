import Matrix from "./Matrix.js";
import StaticMath from "./StaticMath.js";

export default class RotationVector {
  vector;
  constructor(vector) {
    this.vector = vector;
  }
  static rotateAroundXAxis(angleInRad) {
    const cos = Math.cos(angleInRad);
    const sin = Math.sin(angleInRad);
    const matrix = Matrix.fromRowsArray([
      [1, 0, 0],
      [0, cos, -sin],
      [0, sin, cos],
    ]);
    return matrix;
  }
  static rotateAroundZAxis(angleInRad) {
    const cos = Math.cos(angleInRad);
    const sin = Math.sin(angleInRad);
    const matrix = Matrix.fromRowsArray([
      [cos, -sin, 0],
      [sin, cos, 0],
      [0, 0, 1],
    ]);
    return matrix;
  }
  static rotateAroundYAxis(angleInRad) {
    const cos = Math.cos(angleInRad);
    const sin = Math.sin(angleInRad);
    const matrix = Matrix.fromRowsArray([
      [cos, 0, sin],
      [0, 1, 0],
      [-sin, 0, cos],
    ]);
    return matrix;
  }

  static getRotationMatrix(angleX, angleY, angleZ) {
    const matrixX = StaticMath.getXMatrix(angleX)
    const matrixY = StaticMath.getYMatrix(angleY)
    const matrixZ = StaticMath.getZMatrix(angleZ)
    return matrixX.matrixMultiply(
      matrixY.matrixMultiply(
        matrixZ
      )
    );
  }
}
