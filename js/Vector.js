class Vector {
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
  times(numberOfTimes) {
    const output = [];
    for (let i = 0; i < this.numbers.length; i++) {
      output.push(this.numbers[i] * numberOfTimes);
    }
    return new Vector(output);
  }
  // timesVector(secondVector) {
  //   const array = []
  //   for (let i = 0; i < secondVector.asArray().length; i++){
  //     array.push(this.numbers[i] * secondVector.asArray()[i]);
  //   }
  //       const output = new Vector(array);
  //   return output;
  // }
  add(v) {
    const output = [];
    const secondSummand = v.asArray();
    for (let i = 0; i < this.numbers.length; i++) {
      output.push(this.numbers[i] + secondSummand[i]);
    }
    return new Vector(output);
  }
  subtract(subtrahend) {
    if(subtrahend instanceof Vector)
      return this.add(subtrahend.times(-1));
    else return this.numbers
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
