import StaticMath from "./StaticMath.js";

export default class Rotate {

    static rotateVec(vector, ax, ay, az) {
        return Rotate.getRotationMatrix(ax, ay, az).vectorMultiply(vector);
    }

    static rotateArrayOfMatrices(arrayOfMatrices, angleX = 0, angleY = 0, angleZ = 0) {
        const result = [];
        for (let m = 0; m < arrayOfMatrices.length; m++) {
            const currMatrix = arrayOfMatrices[m].transpose();

            const rotationMatrix = StaticMath.rotationMatrix(angleX, angleY, angleZ);
            result.push(currMatrix.matrixMultiply(rotationMatrix).transpose());

        }
        return result;
    }

    static getRotationMatrix(angleX, angleY, angleZ) {
        const matrixX = StaticMath.getXMatrix(angleX)
        const matrixY = StaticMath.getYMatrix(angleY)
        const matrixZ = StaticMath.getZMatrix(angleZ)
        return matrixX.matrixMultiply(matrixY.matrixMultiply(matrixZ));
    }
}