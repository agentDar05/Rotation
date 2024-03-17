import { log } from "node:console";
import Vector from "./Vector.js";
export default class Matrix {
  vectors;
  constructor(vectors) {
    this.vectors = vectors;
  }
  /**
   *
   * @param {Vector[]} cols
   * @returns {Matrix}
   */
  static fromRows(vectors) {
    const cols = new Matrix(vectors);
    return cols.transpose();
  }
  addVector(v) {
    const translated = [];
    for (let i = 0; i < this.vectors.length; i++) {
      translated.push(this.vectors.asArray()[i].add(v));
    }
    return new Matrix(translated);
  }
  asArray() {
    return this.vectors;
  }
  toString() {
    let output = "";
    for (let a = 0; a < this.height; a++) {
      let row = "";
      for (let i = 0; i < this.width; i++) {
        row = row + this.vectors[i].vectorToArrayOfStrings()[a] + " ";
      }
      // console.log(row)
      output = output + row + "\n";
    }

    return output.substring(0, output.length - 1);
  }
  // asNumbers() {
  //   let result = "";
  //   for (let i = 0; i < this.vectors.length; i++) {
  //     const currVector = this.vectors[i]
  //     for (let a = 0; a < currVector.asArray(); a++){
  //       result = result + currVector.asArray()[a]
  //     }

  //   }
  //   console.log(result)
  //   return result;
  // }
  /**
   *
   * @param {Stroke} number
   * @param {Number} numberOfSpaces
   */

  canMultiplyByVector(vector) {
    return this.width === vector.dimensions;
  }
  /**
   *
   * @returns {Matrix}
   */
  transpose() {
    let rows = [];
    for (let r = 0; r < this.height; r++) {
      const row = [];
      for (let c = 0; c < this.width; c++) {
        row.push(this.vectors[c].asArray()[r]);
      }
      rows.push(new Vector(row));
    }
    return new Matrix(rows);
  }
  dimensions() {
    return [this.vectors[0].dimensions, this.vectors.length];
  }
  get height() {
    return this.vectors[0].dimensions;
  }
  get width() {
    return this.vectors.length;
  }
  multiplyOnVector(vector) {
    if (this.canMultiplyByVector(vector)) {
      const matrix = this.transpose();
      let outputVector = [];
      for (let i = 0; i < this.height; i++) {
        outputVector.push(matrix.asArray()[i].dot(vector));
      }
      return new Vector(outputVector);
    } else
      throw new Error(
        `matrix and vector have incompatible dimensions: ${this.height}x${this.width} and ${vector.dimensions}`
      );
  }
  multiplyByMatrix(matrix) {
    const newMatrix = matrix.transpose();
    const matrixArray = newMatrix.asArray();
    let array = [];
    const output = new Matrix(array);
    for (let i = 0; i < newMatrix.width; i++) {
      array.push(this.multiplyOnVector(matrixArray[i]));
    }
    return output;
  }
}
