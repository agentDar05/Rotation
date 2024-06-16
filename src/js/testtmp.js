import Vector from "./Vector.js"
describe("rotateVector", () => {
    xit("rotates vector", () => {
    const orig = [2, 3]
    const rotated = rotateVector(orig,146.3)
    console.log(rotated)
    })
    it("returns  dot product", () => {
      const a = new Vector([2, 3]);
      const b = new Vector([-3, 2]);
      console.log(a.dot(b))
    });
})
function rotateVector(array, angleInDegrees) {
  const angleInRad = (angleInDegrees / 180) * Math.PI;
  return [
    array[0] * Math.cos(angleInRad) - array[1] * Math.sin(angleInRad),
    array[0] * Math.sin(angleInRad) + array[1] * Math.cos(angleInRad),
  ];
}
