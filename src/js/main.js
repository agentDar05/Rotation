import Matrix from "./Matrix.js";
import Canvas2D from "./Canvas2D.js";
import Vector from "./Vector.js";
import StaticMath from "./StaticMath.js";

let angleDeg = 0;
let number = 1;
const canvasHeight = 300;
const canvasWidth = 300;
const speedButton = document.querySelector(".spdup");
const slowButton = document.querySelector(".slwdn");
const canvas = new Canvas2D(document.querySelector(".canvas-container"), {
  width: canvasWidth,
  height: canvasHeight,
});

function drawLineBtwVectors(drawCanvas, v1, v2) {
  // console.log(drawCanvas, v1, v2);
  drawCanvas.drawLine(
    v1.asArray()[0],
    v1.asArray()[1],
    v2.asArray()[0],
    v2.asArray()[1]
  );
}
const matrix = new Matrix([
  new Vector([0, 0, 0]),
  new Vector([0, 50, 0]),
  new Vector([50, 50, 0]),
  new Vector([50, 0, 0]),
  new Vector([0, 0, 0]),
  new Vector([0, 0, 50]),
  new Vector([0, 50, 50]),
  new Vector([50, 50, 50]),
  new Vector([50, 0, 50]),
  new Vector([0, 0, 50]),
]);

const a1 = new Vector([1, 0, 0]);
const a2 = new Vector([0, 1, 0]);
const STOP = {};

const house = new Matrix([
  // front
  new Vector([0, 0, 0]),
  new Vector([50, 0, 0]),
  new Vector([50, 50, 0]),
  new Vector([0, 50, 0]),
  new Vector([0, 0, 0]),
  STOP,
  //roof
  new Vector([0, 50, 0]),
  new Vector([25, 70, 0]),
  new Vector([25, 70, 0]),
  new Vector([50, 50, 0]),
  STOP,
  //left side
  new Vector([0, 0, 0]),
  new Vector([0, 0, 50]),
  new Vector([0, 50, 50]),
  new Vector([0, 50, 0]),
  STOP,
  //right side
  new Vector([50, 0, 0]),
  new Vector([50, 0, 50]),
  new Vector([50, 50, 50]),
  new Vector([50, 50, 0]),
  STOP,
  // back
  new Vector([0, 0, 50]),
  new Vector([50, 0, 50]),
  new Vector([50, 50, 50]),
  new Vector([0, 50, 50]),
  // new Vector([0, 0, 50]),
  STOP,
  // back roof
  new Vector([0, 50, 50]),
  new Vector([25, 70, 50]),
  new Vector([50, 50, 50]),
  STOP,
  //top roof line
  new Vector([25, 70, 50]),
  new Vector([25, 70, 0]),
  STOP,
  new Vector([50, 50, 0]),
  new Vector([50, 50, 50]),
  new Vector([25, 70, 50]),
  new Vector([25, 70, 0]),
  STOP,
  new Vector([0, 50, 0]),
  new Vector([0, 50, 50]),
  new Vector([25, 70, 50]),
  new Vector([25, 70, 0]),
  STOP,
]);

/**
 *
 * @param {Array} arrayOfVectors
 * @returns {Array}
 */
function convertVectorsToCoords(arrayOfVectors) {
  const newArray = [];
  for (let i = 0; i < arrayOfVectors.length; i++) {
    let currVector = arrayOfVectors[i];
    if (currVector instanceof Vector) {
      currVector = currVector.asArray();
    }
    newArray.push(currVector);
  }
  return newArray;
}

function fillFigure(figure, color) {
  const partedFigure = arrayToParts(figure);
  // console.log(partedFigure);
  for (let i = 0; i < partedFigure.length; i++) {
    fillRect(partedFigure[i], color);
  }
}
/**
 *
 * @param {Array} rect
 * @param {string} color
 */
function fillRect(rect, color) {
  const convertedRect = convertVectorsToCoords(rect);
  canvas.drawFilledPath(convertedRect, color);
}

/**
 *
 * @param {Array} arrayOfVectors
 * @returns {Array}
 */
function arrayToParts(arrayOfVectors) {
  const partedArray = [];
  let currArrPart = [];
  for (let i = 0; i < arrayOfVectors.length; i++) {
    if (arrayOfVectors[i] instanceof Vector)
      currArrPart.push(arrayOfVectors[i]);
    else {
      partedArray.push(currArrPart);
      currArrPart = [];
    }
  }
  return partedArray;
}
const flower = [
  new Vector([0, 0, 0]),
  new Vector([0, 50, 0]),
  STOP,
  new Vector([10, 50, 0]),
  new Vector([-10, 50, 0]),
  new Vector([-10, 70, 0]),
  new Vector([10, 70, 0]),
  new Vector([10, 50, 0]),
];
function areArraysEqual(arr1, arr2) {
  if (arr1 === arr2) return true;
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) if (arr1[i] !== arr2[i]) return false;
  return true;
}


function drawLines(canvas, figure) {
  const array = [];
  const vectors = figure.asArray();
  for (let i = 0; i < vectors.length; i++) {
    const curr = vectors[i];
    const next = vectors[i + 1];
    if (curr instanceof Vector && next instanceof Vector) {
      drawLineBtwVectors(canvas, curr, next);
      array.push(vectors[i].asArray());
    }
  }
}
/**
 *
 * @param {Vector} vector
 * @param {number} angle
 * @returns {Vector}
 */
function rotateX(vector, angle) {
  const c = vector.length();
  if (c === 0) return vector;
  else {
    const newAngle =
      Math.asin(vector.asArray()[1] / c) + degreesToRadians(angle);
    return new Vector([
      vector.asArray()[0],
      Math.cos(newAngle),
      Math.sin(newAngle),
    ]).scale(c);
  }
}
function rotateY(vector, angle) {
  const c = vector.length();
  if (c === 0) return vector;
  else {
    const newAngle =
      Math.asin(vector.asArray()[0] / c) + degreesToRadians(angle);
    return new Vector([
      Math.cos(newAngle),
      vector.asArray()[1],
      Math.sin(newAngle),
    ]).scale(c);
  }
}

function rotateZ(vector, angle) {
  const c = vector.length();
  if (c === 0) return vector;
  else {
    const newAngle =
      Math.asin(vector.asArray()[1] / c) + degreesToRadians(angle);
    return new Vector([
      Math.cos(newAngle),
      Math.sin(newAngle),
      vector.asArray()[2],
    ]).scale(c);
  }
}
/**
 *
 * @param {Vector[]} figure
 * @param {number} angle
 * @returns {Array}
 */
function rotatedZ(figure, angle) {
  const rotated = [];
  for (let i = 0; i < figure.length; i++) {
    const curr = figure[i];
    if (curr instanceof Vector) {
      rotated.push(rotateZ(curr, angle));
    }
  }
  return rotated;
}
function rotatedY(figure, angle) {
  const rotated = [];
  for (let i = 0; i < figure.length; i++) {
    const curr = figure[i];
    if (curr instanceof Vector) {
      rotated.push(rotateY(curr, angle));
    }
  }
  return rotated;
}
function rotatedX(figure, angle) {
  const rotated = [];
  for (let i = 0; i < figure.length; i++) {
    const curr = figure[i];
    if (curr instanceof Vector) {
      rotated.push(rotateX(curr, angle));
    }
  }
  return rotated;
}
function moveFigure(figure, center) {
  if (!center || !figure)
    throw new Error("All params are required: " + figure + ", " + center);
  let output = [];
  for (let i = 0; i < figure.length; i++) {
    if (figure[i] instanceof Vector) {
      output.push(figure[i].subtract(center));
    } else output.push(figure[i]);
  }
  return output;
}
/**
 * @param {number} angle
 * @param {Vector[]} vectors
 */
function rotateVectors(vectors, angleX, angleY, angleZ) {
  const basis = [
    new Vector([1, 0, 0]),
    new Vector([0, 1, 0]),
    new Vector([0, 0, 1]),
  ];
  const bases1 = rotatedX(basis, angleX);
  bases1[0] = basis[0];

  const bases2 = rotatedY(basis, angleY);
  bases2[1] = basis[1];

  const bases3 = rotatedZ(basis, angleZ);
  bases3[2] = basis[2];
  const newVectors = [];
  for (let a = 0; a < vectors.length; a++) {
    if (vectors[a] instanceof Vector) {
      const aCoord = vectors[a];
      const newVector = bases1[0]
        .scale(aCoord.asArray()[0])
        .add(bases1[1].scale(aCoord.asArray()[1]))
        .add(bases1[2].scale(aCoord.asArray()[2]));
      newVectors.push(newVector);
    } else newVectors.push({});
  }

  // console.log(newVectors);
  return newVectors;
}
/**
 *
 * @param {Vector} v
 * @returns {Vector}
 */

function changeBasis(v) {
  return new Vector([
    v.asArray()[0] + canvasWidth / 2,
    v.asArray()[1] * -1 + canvasHeight / 2,
    v.asArray()[2],
  ]);
}
function changeBases(arrayOfVectors) {
  const newArray = [];
  for (const v of arrayOfVectors) {
    if (v instanceof Vector) newArray.push(changeBasis(v));
    else newArray.push(v);
  }
  return newArray;
}
function drawFigure() {
  angleDeg += number;
  canvas.clear();
  const center = new Vector([25, 25, 0]);
  const rotatedHouse = moveFigure(
    rotateVectors(moveFigure(house, center), 20, 0, 0),
    center.scale(-1)
  );
  const rotateHouse = moveFigure(
    rotateVectors(
      moveFigure(rotatedHouse, center),
      angleDeg,
      angleDeg,
      angleDeg
    ),
    center.scale(-1)
  );
  
  drawLines(canvas, changeBases(rotatedHouse));
  canvas.setAlpha(0.4);

  requestAnimationFrame(drawFigure);
}
const a = new Vector([1, -1, 1])
const b = new Vector([0, 1, 3])
const c = new Vector([-1, 2, -4]);
const matrix1 = new Matrix([
  new Vector([5, 3, 6]),
  new Vector([3, 8, 7]),
  new Vector([9, 5, 2]),
  new Vector([1, 0, 0]),
]);
// console.log(matrix1.size())
// drawFigure();
const figure = [
  new Vector([0, 0, 0]),
  new Vector([1, 0, 0]),
  new Vector([0, 1, 0]),
  new Vector([1, 1, 0]),
];