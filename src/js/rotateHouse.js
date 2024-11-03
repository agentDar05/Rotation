import Matrix from "./Matrix.js";
import Canvas2D from "./Canvas2D.js";
import Vector from "./Vector.js";
import StaticMath from "./StaticMath.js";
import CanvasUtils from "./CanvasUtils.js";
import Rotate from "./Rotate.js";
import AssertUtils from "./AssertUtils.js";
const canvasHeight = 300;
const canvasWidth = 300;
const canvas = new Canvas2D(document.querySelector(".rotate-container"), {
  width: canvasWidth,
  height: canvasHeight,
});
const canvas1 = new Canvas2D(document.querySelector(".rotate-container1"), {
  width: canvasWidth,
  height: canvasHeight,
});
const canvas2 = new Canvas2D(document.querySelector(".rotate-container2"), {
  width: canvasWidth,
  height: canvasHeight,
});
const canvas3 = new Canvas2D(document.querySelector(".rotate-container3"), {
  width: canvasWidth,
  height: canvasHeight,
});

const houseColors = [
  "#f4212170", // red
  "#f46c2170", // orange
  "#d0f42170", // yellow
  "#21f44470", // green
  "#21f4e070", // blue
  "#3321f4ff", // dark-blue
  "#8121f470", // purple
  "#f4212170", // red
  "#f46c2170", // orange
  "#d0f42170", // yellow
  "#f4212170",
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
    // back
    new Vector([0, 0, 0]),
    new Vector([50, 0, 0]),
    new Vector([50, 50, 0]),
    new Vector([0, 50, 0])
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
    // front
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
  new Matrix([
    new Vector([0, 0, 0]),
    new Vector([0, 0, 50]),
    new Vector([50, 0, 50]),
    new Vector([50, 0, 0]),
  ]),
];

function convertMatrixToCoords(matrix) {
  const array = [];
  for (let i = 0; i < matrix.width; i++) {
    array.push(matrix.getCol(i).asArray());
  }
  return array;
}

/**
 *
 * @param {Matrix[]} figure
 * @param {string[]} arrayOfColors
 */
function drawFilledFigure(figure, arrayOfColors = []) {
  for (let i = 0; i < figure.length; i++) {
    const canvasVectors = CanvasUtils.toCanvasMatrix(figure[i]);
    let color = arrayOfColors[i] ? arrayOfColors[i] : "black";
    canvas.drawFilledPath(canvasVectors.to2dArray(), color);
  }
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
}


const rotationAxis = new Vector([1, 1, 1]).scale(50);
// Angle between projection & XY, expected: -0.9827937
const angleBtwVectorAndXY = -StaticMath.angleToPlaneXY(
        // Put the vector on XY plane, expected: [0, 2, 3]
        rotationAxis.projectOnYZ(Vector.YAXIS)
);
// Align the vector with the X axis
const angleBtwVecXYAndXZ = -StaticMath.angleToPlaneXZ(
        // Rotate vector to make it lie on XY plane, expected: [1, , 0]
        Rotate.rotateVec(rotationAxis, angleBtwVectorAndXY, 0, 0)
);
const matrixLean = Rotate.getRotationMatrix(angleBtwVectorAndXY, 0, angleBtwVecXYAndXZ);
const matrixLeanInverse = Rotate.getInverseRotationMatrix(angleBtwVectorAndXY, 0, angleBtwVecXYAndXZ);

const houseLeaned = Rotate.rotationMatrixMultiplyByArrayOfMatrices(house, matrixLean);
const centerOfCoords = new Vector([0, 0, 0]);
let angle = 0;

function drawFrame() {
  {
    CanvasUtils.drawFigure(canvas1, house);
    const rotateMatrix1 = Rotate.getRotationMatrix(angleBtwVectorAndXY, 0, 0);
    CanvasUtils.drawFigure(canvas2,  Rotate.rotationMatrixMultiplyByArrayOfMatrices(house, rotateMatrix1));
    CanvasUtils.drawFigure(canvas3, houseLeaned);
  }

  canvas.clear();
  const matrixRotateAroundX = Rotate.getRotationMatrix(angle, 0, 0);
  const houseRotatedAroundX = Rotate.rotationMatrixMultiplyByArrayOfMatrices(houseLeaned, matrixRotateAroundX);
  const houseLeanedBack = Rotate.rotationMatrixMultiplyByArrayOfMatrices(houseRotatedAroundX, matrixLeanInverse);
  CanvasUtils.drawFigure(canvas, houseLeanedBack);
  CanvasUtils.drawLine(canvas, centerOfCoords, rotationAxis);
  angle += 0.01;
  requestAnimationFrame(drawFrame);
}
requestAnimationFrame(() => {
  drawFrame();
});
