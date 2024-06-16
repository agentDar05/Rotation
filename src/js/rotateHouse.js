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

const STOP = {};
const house = [
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
function drawRect(canvas, figure) {
  const vectors = figure.asArray();
  for (let i = 0; i < vectors.length; i++) {
    const curr = vectors[i];
    let next = vectors[i + 1];

    if (i === vectors.length - 1) {
      drawLine(canvas, curr, vectors[0]);
    } else {
      drawLine(canvas, curr, next);
    }
  }
}
function drawLine(drawCanvas, v1, v2) {
  console.log(drawCanvas, v1, v2);
  drawCanvas.drawLine(
    v1.asArray()[0],
    v1.asArray()[1],
    v2.asArray()[0],
    v2.asArray()[1]
  );
}
/**
 * @param {Matrix} matrix
 * @param {number} angleInDeg
 */
/**
 *
 * @param {Matrix[]} figure
 */
function drawFigure(figure) {
  for (let i = 0; i < figure.length; i++) {
    const canvasVectors = toCanvasMatrix(figure[i]);
    drawRect(canvas, canvasVectors);
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
let angleX = 0;
let angleY = 0;
let angleZ = 0;
function drawFrame() {
  canvas.clear();
  const rotatedMatrix = rotateArrayOfMatrices(
    house,
    StaticMath.degreesToRadians(angleX),
    StaticMath.degreesToRadians(angleY),
    StaticMath.degreesToRadians(angleZ)
  );
  drawFigure(rotatedMatrix);
  angleX++;
  angleY++;
  angleZ++;

  requestAnimationFrame(drawFrame)
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
