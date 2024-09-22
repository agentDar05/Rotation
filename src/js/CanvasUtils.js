import Rotate from "./Rotate.js";
import Matrix from "./Matrix.js";
import Vector from "./Vector.js";
export default class CanvasUtils {
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
      static toCanvasMatrix(matrix) {
        const canvasVectors = [];
        for (const n of matrix.asArray()) {
          canvasVectors.push(CanvasUtils.toCanvasVector(n));
        }
        return new Matrix(canvasVectors);
      }
      static drawFigure(figure, arrayOfColors = []) {
        for (let i = 0; i < figure.length; i++) {
          const canvasVectors = CanvasUtils.toCanvasMatrix(figure[i]);
          let color = "black";
          if (arrayOfColors[i]) {
            color = "" + arrayOfColors[i];
          }
          CanvasUtils.drawRect(canvas, canvasVectors, color);
        }
      }
      static drawFilledRect(canvas, matrix, color) {
        const coords = convertMatrixToCoords(matrix);
        canvas.drawFilledPath(coords, color);
      }
      
      static drawFilledFigure(figure, arrayOfColors = []) {
        for (let i = 0; i < figure.length; i++) {
          const canvasVectors = CanvasUtils.toCanvasMatrix(figure[i]);
          let color = "black";
          if (arrayOfColors[i]) {
            color = "" + arrayOfColors[i];
          }
          CanvasUtils.drawFilledRect(canvas, canvasVectors, color);
        }
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