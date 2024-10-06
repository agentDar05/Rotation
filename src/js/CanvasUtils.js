import Matrix from "./Matrix.js";
import Vector from "./Vector.js";

export default class CanvasUtils {
    /**
     *
     * @param {Canvas2D} canvas
     * @param {Matrix} figure
     * @param {String} color
     */
    static drawRect(canvas, figure, color = "black") {
        const vectors = figure.asArray();
        for (let i = 0; i < vectors.length; i++) {
          const curr = vectors[i];
          let next = vectors[i + 1];
      
          if (i === vectors.length - 1) {
            CanvasUtils.drawLine(canvas, curr, vectors[0], color);
          } else {
            CanvasUtils.drawLine(canvas, curr, next, color);
          }
        }
      }

    /**
     *
     * @param {Matrix} matrix
     * @return {Matrix}
     */
    static toCanvasMatrix(matrix) {
        const canvasVectors = [];
        for (const n of matrix.asArray()) {
            canvasVectors.push(CanvasUtils.toCanvasVector(n));
        }
        return new Matrix(canvasVectors);
    }

    /**
     *
     * @param {Canvas2D} canvas
     * @param {Matrix[]} figure
     * @param arrayOfColors
     */
    static drawFigure(canvas, figure, arrayOfColors = []) {
        for (let i = 0; i < figure.length; i++) {
            const canvasFigure = figure[i];
            let color = "black";
            if (arrayOfColors[i]) {
                color = "" + arrayOfColors[i];
            }
            CanvasUtils.drawRect(canvas, canvasFigure, color);
        }
    }
      static drawFilledRect(canvas, matrix, color) {
        const coords = CanvasUtils.toCanvasMatrix(matrix);
        canvas.drawFilledArrayOfMatrices(coords, color)
        canvas.drawFilledPath(coords, color);
        
      }
      /**
       * 
       * @param {Matrix[]} arrayOfMatrices 
       */
      static arrayOfMatricesToCoords(arrayOfMatrices){
        const arr = []
        for(let i = 0; i<arrayOfMatrices.length; i++){
          arr.push(arrayOfMatrices[i].vectorToCoords())

      }
      console.log(arr)
      }
      static drawLine(drawCanvas, v1, v2, color = "black") {
        drawCanvas.drawLine(
          CanvasUtils.toCanvasVector(v1).asArray()[0],
          CanvasUtils.toCanvasVector(v1).asArray()[1],
          CanvasUtils.toCanvasVector(v2).asArray()[0],
          CanvasUtils.toCanvasVector(v2).asArray()[1],
          color
        );
      }

      static toCanvasVector(vector) {
        const v = vector.asArray();
        const arr = [v[0] + 150, 150 - v[1]];
        if (vector.dimensions > 2) arr.push(v[2]);
        return new Vector(arr);
      }
      
    }