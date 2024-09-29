import StaticMath from "./StaticMath.js";

export default class Rotate {

    /**
     * @param {Vector} vector
     * @param {number} ax
     * @param {number} ay
     * @param {number} az
     * @return {Vector}
     */
    static rotateVec(vector, ax, ay, az) {
        return Rotate.getRotationMatrix(ax, ay, az).vectorMultiply(vector);
    }

    /**
     * @param {Matrix[]}arrayOfMatrices
     * @param {number} angleX
     * @param {number} angleY
     * @param {number} angleZ
     * @return {Matrix[]}
     */
    static rotateArrayOfMatrices(arrayOfMatrices, angleX = 0, angleY = 0, angleZ = 0) {
        const result = [];
        const rotationMatrix = StaticMath.rotationMatrix(angleX, angleY, angleZ);
        for (let m = 0; m < arrayOfMatrices.length; m++) {
            const currMatrix = arrayOfMatrices[m].transpose();
            result.push(rotationMatrix.matrixMultiply(currMatrix.transpose()));
        }
        return result;
    }

    /**
     * @param {number} angleX
     * @param {number} angleY
     * @param {number} angleZ
     * @return {Matrix}
     */
    static getRotationMatrix(angleX, angleY, angleZ) {
        const matrixX = StaticMath.getXMatrix(angleX)
        const matrixY = StaticMath.getYMatrix(angleY)
        const matrixZ = StaticMath.getZMatrix(angleZ)
        return matrixX.matrixMultiply(matrixY.matrixMultiply(matrixZ));
    }
}