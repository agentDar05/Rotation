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

let movedHouse = moveFigure(house, new Vector([25, 25, 25]));
let currAngles = new Vector([0, 0, 0]);
const speed = new Vector([1, 1, 1]);

const rotationAxis = new Vector([1, 2, 3]).scale(20);
// Put the vector on XY plane, expected: [0, 2, 3]
let vecProjectionOnYZ = rotationAxis.projectOnYZ(Vector.YAXIS);
// Angle between projection & XY, expected: -0.9827937
const angleBtwVectorAndXY = -StaticMath.angleToPlaneXY(vecProjectionOnYZ);
console.log(angleBtwVectorAndXY);

// Rotate vector to make it lie on XY plane, expected: [1, , 0]
const vectorOnXY = Rotate.rotateVec(rotationAxis, angleBtwVectorAndXY, 0, 0);

// Align the vector with the X axis
const angleBtwVecXYAndXZ = -StaticMath.angleToPlaneXZ(vectorOnXY);
const rotateMatrix = Rotate.getRotationMatrix(
  angleBtwVectorAndXY,
  0,
  angleBtwVecXYAndXZ
);
console.log(angleBtwVecXYAndXZ);

const vectorAlignedWithX = Rotate.rotateVec(
  vectorOnXY,
  0,
  0,
  angleBtwVecXYAndXZ
);
// const originalVector = Rotate.rotateVec(vectorAlignedWithX, -angleBtwVectorAndXY, 0, -angleBtwVecXYAndXZ)
const originalVector = rotateMatrix.vectorMultiply(rotationAxis);
const rotationMatrix = Rotate.getRotationMatrix(0, 0, angleBtwVecXYAndXZ);
const inverseRotationMatrix = Rotate.getInverseRotationMatrix(
  angleBtwVectorAndXY,
  0,
  angleBtwVecXYAndXZ
);
// red house
const rotatedH = Rotate.rotationMatrixMultiplyByArrayOfMatrices(
  house,
  Rotate.getRotationMatrix(angleBtwVectorAndXY, 0, 0)
);
const expectedHouse = Rotate.rotationMatrixMultiplyByArrayOfMatrices(
  rotatedH,
  rotationMatrix
);
const redVector = Rotate.rotationMatrixMultiplyByVector(
  rotationAxis,
  Rotate.getRotationMatrix(angleBtwVectorAndXY, 0, 0)
);

console.log(Rotate.getRotationMatrix(angleBtwVectorAndXY, 0, 0));

const expectedVector = Rotate.rotationMatrixMultiplyByVector(
  redVector,
  rotationMatrix
);
console.log(expectedVector);

const centerOfCoords = new Vector([0, 0, 0]);
// inverseRotationMatrix;
let angle = 0;

function drawFrame() {
  canvas.clear();
  let matrixX = Rotate.getRotationMatrix(angle, 0, 0);
  let rotatedByXAxis = Rotate.rotationMatrixMultiplyByArrayOfMatrices(
    expectedHouse,
    matrixX
  );
  let rotatedBackHouse = Rotate.rotationMatrixMultiplyByArrayOfMatrices(
    rotatedByXAxis,
    inverseRotationMatrix
  );
  // let alignedHouse = Rotate.rotateArrayOfMatrices(house, -angleBtwVectorAndXY, 0, 0)
  // alignedHouse = Rotate.rotateArrayOfMatrices(alignedHouse, 0, 0, angleBtwVecXYAndXZ)
  // const rotatedHouse = Rotate.rotateArrayOfMatrices(alignedHouse, angle, 0, 0)
  // alignedHouse = Rotate.rotateArrayOfMatrices(rotatedHouse,-angleBtwVectorAndXY, 0, -angleBtwVecXYAndXZ)
  const alignedHouse = Rotate.rotationMatrixMultiplyByArrayOfMatrices(
    house,
    rotateMatrix
  );
  CanvasUtils.drawFigure(canvas, rotatedBackHouse);
  let drawVector = Rotate.rotationMatrixMultiplyByVector(
    originalVector,
    Rotate.getRotationMatrix(0, 0, 0)
  );
  CanvasUtils.drawLine(canvas, centerOfCoords, drawVector);
  // CanvasUtils.drawFigure(canvas, house);
  let rotatingHouse = Rotate.rotationMatrixMultiplyByArrayOfMatrices(
    expectedHouse,
    Rotate.getRotationMatrix(angle, 0, 0)
  );
  // drawFilledFigure(rotatingHouse, houseColors);

  // drawFilledFigure(rotatingHouse, houseColors);

  // CanvasUtils.drawFigure(canvas,expectedHouse);
  // CanvasUtils.drawLine(canvas, centerOfCoords, expectedVector);

  // CanvasUtils.drawLine(canvas, centerOfCoords, vectorAlignedWithX);
  // CanvasUtils.drawFigure(canvas, alignedHouse, houseColors);
  // drawFilledFigure(alignedHouse, houseColors);
  angle += 0.01;

  // CanvasUtils.drawLine(canvas, centerOfCoords, rotationAxis);
  // CanvasUtils.drawLine(canvas, centerOfCoords, originalVector);
  currAngles = currAngles.add(speed);

  requestAnimationFrame(drawFrame);
}
requestAnimationFrame(() => {
  drawFrame();
});
