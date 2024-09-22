import Matrix from "./Matrix.js";
import Canvas2D from "./Canvas2D.js";
import Vector from "./Vector.js";
import StaticMath from "./StaticMath.js";
import CanvasUtils from "./CanvasUtils.js";
import Rotate from "./Rotate.js";
const canvasHeight = 300;
const canvasWidth = 300;
const canvas = new Canvas2D(document.querySelector(".rotate-container"), {
  width: canvasWidth,
  height: canvasHeight,
});


const vec = new Vector([1, 2, 3]);



const angleBtwVectorAndY = StaticMath.angleToPlaneXY(vec.projectOnYZ(new Vector([0, 1, 0])))
const vectorOnXY = Rotate.rotateVec(vec, angleBtwVectorAndY, 0 ,0)
const angleBtwVecAndX = StaticMath.angleToPlaneXZ(vectorOnXY)
const rotatedVector = Rotate.rotateVec(vectorOnXY, 0, 0, angleBtwVecAndX)

/*---------------------------------------------------------*/

const angleAroundXAxis = StaticMath.returnAngleBetweenVectors(
  vec.projectOnYZ(),
  new Vector([0, 1, 0])
);
const vectorOnPlaneXY = Rotate.rotateVec(vec, angleAroundXAxis, 0, 0);
const angleAroundZAxis = StaticMath.returnAngleBetweenVectors(
  vectorOnPlaneXY,
  new Vector([1, 0, 0])
);
const centerOfCoords = new Vector([0, 0, 0]);
const newAxis = Rotate.rotateVec(vectorOnPlaneXY, 0, 0, angleAroundZAxis);



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

/**
 *
 * @param {Canvas2D} canvas
 * @param {Matrix} figure
 */

let rotatedHouse = Rotate.rotateArrayOfMatrices(house, angleAroundXAxis, 0, 0);
rotatedHouse = Rotate.rotateArrayOfMatrices(rotatedHouse, 0, 0, angleAroundZAxis);
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





/**
 * @param {Matrix[]}arrayOfMatrices
 * @param {number} angleX
 * @param {number} angleY
 * @param {number} angleZ
 *
 */

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
/**
 *
 * @param {Vector} vector
 * @param {number} ax
 * @param {number} ay
 * @param {number} az
 */



/**
 * @param {Vector} axis
 * @param {Matrix[]} figure
 * @param {Vector} angle
 */

let movedHouse = moveFigure(house, new Vector([25, 25, 25]));
let currAngles = new Vector([0, 0, 0]);
const speed = new Vector([1, 1, 1]);
function drawFrame() {
  canvas.clear();
  let rotatedMatrix = Rotate.rotateArrayOfMatrices(
    movedHouse,
    StaticMath.degreesToRadians(currAngles.get(0)),
    StaticMath.degreesToRadians(currAngles.get(1)),
    StaticMath.degreesToRadians(currAngles.get(2))
  );
  canvas.drawText(
    200,
    100,
    StaticMath.radiansToDegrees(angleAroundXAxis) + "",
    "black"
  );

  // drawLine(canvas, new Vector([100, 100, 100]), new Vector([100, 60, 40]));
  rotatedMatrix = moveFigure(rotatedMatrix, new Vector([-25, -25, -25]));
  // drawFigure(rotatedMatrix);
  // CanvasUtils.drawLine(
  //   canvas,
  //   centerOfCoords,
  //   vec.scale(10)
  // );
  // CanvasUtils.drawLine(
  //   canvas,
  //   centerOfCoords, 
  //   new Vector([10, 0, 0])
  // )
  // CanvasUtils.drawLine(
  //   canvas,
  //   centerOfCoords,
  //   vectorOnPlaneXY.scale(10)
  // );
  // CanvasUtils.drawLine(
  //   canvas,
  //   centerOfCoords,
  //   newAxis.scale(10)
  // );
    CanvasUtils.drawLine(canvas, centerOfCoords, rotatedVector.scale(10

    ))
  // drawLine(canvas, new Vector([100, 100, 100]), new Vector([80, 60, 40]));

  // drawFilledFigure(rotatedMatrix, houseColors);

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

