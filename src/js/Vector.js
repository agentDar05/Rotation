import Matrix from "./Matrix.js";
import StaticMath from "./StaticMath.js";

export default class Vector {
  numbers;
  constructor(numbers) {
    if (!Array.isArray(numbers))
      throw new Error(
        "Must pass an array to class Vector. Currently: " + numbers
      );
    for (let i = 0; i < numbers.length; i++) {
      if (typeof numbers[i] !== "number")
        throw new Error("Must pass an array of numbers. Currently: " + numbers);
    }
    this.numbers = numbers;
  }
  /**
   *
   * @returns {number}
   */
  get dimensions() {
    return this.numbers.length;
  }
  get(idx) {
    return this.numbers[idx]
  }
  times(numberOfTimes) {
    const output = [];
    for (let i = 0; i < this.numbers.length; i++) {
      output.push(this.numbers[i] * numberOfTimes);
    }
    return new Vector(output);
  }
  /**
   * @param {Vector} b
   */
  projection(b) {
    const square = b.dot(b);
    const dotProduct = this.dot(b);
    return {
      dot: dotProduct,
      square: square,
      result: b.times(dotProduct / square),
    };
  }
  
  rotation(angleInDegrees) {
    const angleInRadians = StaticMath.degreesToRadians(angleInDegrees);
    const cos = Math.cos(angleInRadians);
    const sin = Math.sin(angleInRadians);
    const matrix = Matrix.fromRowsArray([
      [cos, -sin],
      [sin, cos],
    ]);

    const vector = new Vector(this.numbers);
    return matrix.multiplyOnVector(vector);
  }
  toString() {
    return 'Vector ' + this.numbers
  }
  dot(secondVector) {
    if (this.dimensions !== secondVector.dimensions)
      throw new Error("Vectors must have the same size");
    let number = 0;
    for (let i = 0; i < secondVector.asArray().length; i++) {
      number = number + this.numbers[i] * secondVector.asArray()[i];
    }
    const output = number;
    return output;
  }
  addSpaces(indexOfVector, numberOfSpaces) {
    let number = this.numbers[indexOfVector] + "";
    for (let i = 0; i < numberOfSpaces; i++) {
      number = number + " ";
    }
    return number;
  }
  /**
   *
   * @returns {string[]}
   */
  convertToString() {
    const output = [];
    for (let i = 0; i < this.numbers.length; i++) {
      output.push(this.numbers[i] + "");
    }
    return output;
  }
  findLongestString(strings) {
    let maxLength = 0;
    let longestString = "";

    for (let i = 0; i < strings.length; i++) {
      if (strings[i].length > maxLength) {
        maxLength = strings[i].length;
        longestString = strings[i];
      }
    }

    return { string: longestString, length: maxLength };
  }
  vectorToArrayOfStrings() {
    const result = [];

    const longestNumber = this.findLongestString(this.convertToString());

    for (let i = 0; i < this.numbers.length; i++) {
      const currString = this.numbers[i] + "";
      let curr = this.numbers[i];
      if (currString.length < longestNumber.length) {
        curr = this.addSpaces(i, longestNumber.length - currString.length);
      }
      result.push(curr + "");
    }
    return result;
  }
  add(v) {
    const output = [];
    const secondSummand = v.asArray();
    for (let i = 0; i < this.numbers.length; i++) {
      output.push(this.numbers[i] + secondSummand[i]);
    }
    return new Vector(output);
  }
  /**
   * 
   * @param {Vector} subtrahend 
   * @returns {Vector}
   */
  subtract(subtrahend) {
    if (subtrahend instanceof Vector) return this.add(subtrahend.times(-1));
    else return this.numbers;
  }
  asArray() {
    return this.numbers;
  }
  length() {
    let sum = 0;
    for (const curr of this.numbers) {
      sum += Math.pow(curr, 2);
    }
    return Math.sqrt(sum);
  }
}


