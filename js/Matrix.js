class Matrix {
  vectors;
  constructor(vectors) {
    this.vectors = vectors;
  }
  add(a) {
    const translated = [];
    for (let i = 0; i < this.vectors.length; i++) {
      translated.push(this.vectors.asArray[i].add(a));
    }
    return new Matrix(translated);
  }
  asArray() {
    return this.vectors;
  }
  toString() {
    let result = "";
    const height = this.columns[0].dimensions();
    for (let i = 0; i < height; i++) {
      for (let col of this.columns) {
        result = result + " " + col.asArray()[i];
      }
      result = result + "\n";
    }
    return result;
  }
}
