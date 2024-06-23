import Matrix from "./Matrix.js";
import Canvas2D from "./Canvas2D.js";
import Vector from "./Vector.js";
import StaticMath from "./StaticMath.js";
import RotationVector from "./RotationVector.js";
const canvasHeight = 300;
const canvasWidth = 300;
const canvas = new Canvas2D(document.querySelector(".rotate-container"), {
  width: canvasWidth,
  height: canvasHeight,
});
const houseColors = [
  "#f4212170", // red
  "#f46c2170", // orange
  "#d0f42170", // yellow
  "#21f44470", // green
  "#21f4e070", // blue
  "#3321f470", // dark-blue
  "#8121f470", // purple
  "#f4212170", // red
  "#f46c2170", // orange
  "#d0f42170", // yellow
];
const STOP = {};
const house = [
  new Matrix([
    // floor
    new Vector([0, 0, 0]),
    new Vector([50, 0, 0]),
    new Vector([50, 0, 50]),
    new Vector([0, 0, 50]),
  ]),
  new Matrix([
    // front
    new Vector([0, 0, 0]),
    new Vector([50, 0, 0]),
    new Vector([50, 50, 0]),
    new Vector([0, 50, 0]),
    new Vector([0, 0, 0]),
  ]),

  new Matrix([
    //roof
    new Vector([0, 50, 0]),
    new Vector([25, 70, 0]),
    new Vector([25, 70, 0]),
    new Vector([50, 50, 0]),
  ]),
  new Matrix([
    //left side
    new Vector([0, 0, 0]),
    new Vector([0, 0, 50]),
    new Vector([0, 50, 50]),
    new Vector([0, 50, 0]),
  ]),
  new Matrix([
    //right side
    new Vector([50, 0, 0]),
    new Vector([50, 0, 50]),
    new Vector([50, 50, 50]),
    new Vector([50, 50, 0]),
  ]),
  new Matrix([
    // back
    new Vector([0, 0, 50]),
    new Vector([50, 0, 50]),
    new Vector([50, 50, 50]),
    new Vector([0, 50, 50]),
  ]),
  new Matrix([
    // back roof
    new Vector([0, 50, 50]),
    new Vector([25, 70, 50]),
    new Vector([50, 50, 50]),
  ]),
  new Matrix([
    //top roof line
    new Vector([25, 70, 50]),
    new Vector([25, 70, 0]),
  ]),
  new Matrix([
    new Vector([50, 50, 0]),
    new Vector([50, 50, 50]),
    new Vector([25, 70, 50]),
    new Vector([25, 70, 0]),
  ]),

  new Matrix([
    new Vector([0, 50, 0]),
    new Vector([0, 50, 50]),
    new Vector([25, 70, 50]),
    new Vector([25, 70, 0]),
  ]),
];
/**
 * @param {Vector} vector
 * @returns {Vector}
 */
function toCanvasVector(vector) {
  const v = vector.asArray();
  const arr = [v[0] + 150, 150 - v[1]];
  if (vector.dimensions > 2) arr.push(v[2]);
  return new Vector(arr);
}
/**
 *
 * @param {Canvas2D} canvas
 * @param {Matrix} figure
 */
function drawRect(canvas, figure, color = "black") {
  const vectors = figure.asArray();
  for (let i = 0; i < vectors.length; i++) {
    const curr = vectors[i];
    let next = vectors[i + 1];

    if (i === vectors.length - 1) {
      drawLine(canvas, curr, vectors[0], color);
    } else {
      drawLine(canvas, curr, next, color);
    }
  }
}
function drawLine(drawCanvas, v1, v2, color = "black") {
  drawCanvas.drawLine(
    v1.asArray()[0],
    v1.asArray()[1],
    v2.asArray()[0],
    v2.asArray()[1],
    color
  );
}
function convertMatrixToCoords(matrix) {
  const array = [];
  for (let i = 0; i < matrix.width; i++) {
    array.push(matrix.getCol(i).asArray());
  }
  return array;
}

/**
 * @param {Matrix} matrix
 * @param {Array} color
 */
function drawFilledRect(canvas, matrix, color) {
  const coords = convertMatrixToCoords(matrix);
  canvas.drawFilledPath(coords, color);
}

function drawFilledFigure(figure, arrayOfColors = []) {
  for (let i = 0; i < figure.length; i++) {
    const canvasVectors = toCanvasMatrix(figure[i]);
    let color = "black";
    if (arrayOfColors[i]) {
      color = "" + arrayOfColors[i];
    }
    drawFilledRect(canvas, canvasVectors, color);
  }
}
function drawFigure(figure, arrayOfColors = []) {
  for (let i = 0; i < figure.length; i++) {
    const canvasVectors = toCanvasMatrix(figure[i]);
    let color = "black";
    if (arrayOfColors[i]) {
      color = "" + arrayOfColors[i];
    }
    drawRect(canvas, canvasVectors, color);
  }
}
const randomFigure = [
  new Matrix([
    new Vector([0, 0, 0]),
    new Vector([100, 0, 0]),
    new Vector([100, 100, 0]),
    new Vector([0, 100, 0]),
    new Vector([0, 0, 0]),
  ]),
];

/**
 * @param {Matrix[]}arrayOfMatrices
 * @param {number} angleX
 * @param {number} angleY
 * @param {number} angleZ
 *
 */
function rotateArrayOfMatrices(
  arrayOfMatrices,
  angleX = 0,
  angleY = 0,
  angleZ = 0
) {
  const result = [];
  for (let m = 0; m < arrayOfMatrices.length; m++) {
    const currMatrix = arrayOfMatrices[m].transpose();

    const rotationMatrix = StaticMath.rotationMatrix(angleX, angleY, angleZ);
    result.push(currMatrix.multiplyByMatrix(rotationMatrix).transpose());
    // const array = [];
    // const matrix = new Matrix(array)
    // for (let v = 0; v < currMatrix.dimensions; v++) {
    //   const vector = new RotationVector(currMatrix.dimensions[v]);
    //   array.push(vector.rotateVector(angleX, angleY, angleZ))
    // }
    // result.push(matrix)
  }
  return result;
}
/**
 *
 * @param {Matrix} figure
 * @param {Vector} center
 * @returns {Matrix}
 */
function moveFigure(figure, center) {
  const output = [];
  for (let c = 0; c < figure.length; c++) {
    const currMatrix = figure[c];
    const arr = [];
    for (let v = 0; v < currMatrix.asArray().length; v++) {
      const currVec = currMatrix.asArray()[v];
      arr.push(currVec.subtract(center));
    }
    output.push(new Matrix(arr));
  }
  return output;
  // let output = [];

  // for (let c = 0; c < figure.length; c++) {
  //   for (let i = 0; i < figure[c].asArray().length; i++) {
  //     const element = figure[c].height;
  //     const currVector = element.getCol(c);

  //   }
  //   output.push(currVector.subtract(center));
  // }
  // return new Matrix(output)
}

const figure = new Matrix([
  new Vector([10, 0, -10]),
  new Vector([20, 1, -20]),
  new Vector([30, 0, -30]),
]);

let movedHouse = moveFigure(house, new Vector([25, 25, 25]))
let currAngles = new Vector([0, 0, 0]);
const speed = new Vector([1, 1, 1]);
function drawFrame() {
  canvas.clear();
  let rotatedMatrix = rotateArrayOfMatrices(
    movedHouse,
    StaticMath.degreesToRadians(currAngles.get(0)),
    StaticMath.degreesToRadians(currAngles.get(1)),
    StaticMath.degreesToRadians(currAngles.get(2))
  );
  /*
  func (vector, figure, angle){
  calcAngles(vector)
  lean house
  rotate
  lean back house
  }

  func calcAngles(Vector){
  return rotation matrix
  }
  */
  rotatedMatrix = moveFigure(rotatedMatrix, new Vector([-25,-25,-25]))
  drawFigure(rotatedMatrix)
  // center of house
  drawFilledFigure(
    rotatedMatrix,
    houseColors
  );
  currAngles = currAngles.add(speed);

  requestAnimationFrame(drawFrame);
}
requestAnimationFrame(() => {
  drawFrame();
});
/**
 * @param {Matrix} matrix
 * @param {number} i
 * @returns {Matrix}
 */
function toCanvasMatrix(matrix) {
  const canvasVectors = [];
  for (const n of matrix.asArray()) {
    canvasVectors.push(toCanvasVector(n));
  }
  return new Matrix(canvasVectors);
}
// drawRect(canvas, randomFigure)
