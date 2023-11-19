function drawLine(drawCanvas, v1, v2) {
  const c1 = changeBasis(v1);
  const c2 = changeBasis(v2);
  // console.log(v1, v2);
  drawCanvas.drawLine(
    c1.asArray()[0],
    c1.asArray()[1],
    c2.asArray()[0],
    c2.asArray()[1]
  );
}
/**
 *
 * @param {Vector} vector
 * @param {number} angle
 * @returns {Vector}
 */
function rotate(vector, angle) {
  const c = vector.length();
  if (c === 0) return vector;
  else {
    const newAngle =
      Math.asin(vector.asArray()[1] / c) + degreesToRadians(angle);
    return new Vector([Math.cos(newAngle), Math.sin(newAngle)]).times(c);
  }
}
const a = new Vector([2, 6]);

function degreesToRadians(degree) {
  return (degree * Math.PI) / 180;
}
function isArraysEqual(arr1, arr2) {
  if (arr1 === arr2) return true;
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) if (arr1[i] !== arr2[i]) return false;
  return true;
}

const STOP = {};

const house = [
  new Vector([0, 0]),
  new Vector([50, 0]),
  new Vector([50, 50]),
  new Vector([0, 50]),
  new Vector([0, 0]),
  STOP,
  new Vector([0, 50]),
  new Vector([25, 70]),

  STOP,
  new Vector([50, 50]),
  new Vector([25, 70]),
];
const flower = [
  new Vector([0, 0]),
  new Vector([0, 50]),
  STOP,
  new Vector([10, 50]),
  new Vector([-10, 50]),
  new Vector([-10, 70]),
  new Vector([10, 70]),
  new Vector([10, 50]),
];
/**
 *
 * @param {Vector[]} figure
 */
function drawLines(canvas, figure) {
  for (let i = 0; i < figure.length; i++) {
    const curr = figure[i];
    const next = figure[i + 1];
    if (curr instanceof Vector && next instanceof Vector)
      drawLine(canvas, curr, next);
  }
}
//   const rotatedFigure = rotated(figure, angle);
/**
 *
 * @param {Vector[]} figure
 * @param {number} angle
 * @returns
 */
function rotated(figure, angle) {
  const rotated = [];
  for (let i = 0; i < figure.length; i++) {
    const curr = figure[i];
    if (curr instanceof Vector) {
      rotated.push(rotate(curr, angle));
    }
  }
  return rotated;
}
const canvasHeight = 300;
const canvasWidth = 300;
const canvas = new Canvas2D(document.querySelector(".canvas-container"), {
  width: canvasWidth,
  height: canvasHeight,
});
const canvas1 = new Canvas2D(document.querySelector(".canvas-container"), {
  width: canvasWidth,
  height: canvasHeight,
});
/**
 *
 * @param {Vector} v
 * @returns {Vector}
 */

function changeBasis(v) {
  return new Vector([
    v.asArray()[0] + canvasWidth / 2,
    v.asArray()[1] * -1 + canvasHeight / 2,
  ]);
}
const angle = 75;

drawLines(canvas, house);
drawLines(canvas1, rotated(house, 60));
// drawLines(canvas, flower);
// drawLines(canvas1, rotated(flower, 90));
