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
  add(v) {
    const output = [];
    const secondSummand = v.asArray();
    for (let i = 0; i < this.numbers.length; i++) {
      output.push(this.numbers[i] + secondSummand[i]);
    }
    return new Vector(output);
  }
  subtract(subtrahend) {
    return this.add(subtrahend.times(-1));
  }
  asArray() {
    return this.numbers;
  }
  length() {
    const x = this.numbers[0];
    const y = this.numbers[1];
    const a = Math.pow(x, 2);
    const b = Math.pow(y, 2);
    const c = Math.sqrt(a + b);
    return c;
  }
}
