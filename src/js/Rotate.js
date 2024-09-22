import CanvasUtils from "./CanvasUtils.js";
import RotationVector from "./RotationVector.js";
import StaticMath from "./StaticMath.js";

export default class Rotate{
      static rotateVec(vector, ax, ay, az) {
        return RotationVector.getRotationMatrix(ax, ay, az).vectorMultiply(
          vector
        );
      }
      static rotateArrayOfMatrices(
        arrayOfMatrices,
        angleX = 0,
        angleY = 0,
        angleZ = 0
      ) {
        const result = [];
        for (let m = 0; m < arrayOfMatrices.length; m++) {
          const currMatrix = arrayOfMatrices[m].transpose();
      
          const rotationMatrix = StaticMath.rotationMatrix(angleX, angleY, angleZ);
          result.push(currMatrix.matrixMultiply(rotationMatrix).transpose());
          
        }
        return result;
      }
}