const selectedCellIndexes = [];
window.addEventListener("load", (_) => {
    const redrawBtn = document.getElementById('Re-draw');
    redrawBtn.addEventListener("click", () => {
        drawPuck();
    });
    drawPuck();
});
function drawPuck() {
    const innerCircleValue = document.getElementById('inner-circle').value;
    const outerCircleValue = document.getElementById('outer-circle').value;
    const rowLengths = [parseInt(innerCircleValue), parseInt(outerCircleValue)];

    const puckElement = document.querySelector('.puck');
    puckElement.replaceChildren();
    const drawPuck = new Puck(puckElement, rowLengths, selectedCellIndexes)
    drawPuck.draw();
    drawPuck.addCell(1 , new PuckCell(false, 'puck__cell--status-success', '5',null));
    drawPuck.addCell(2, new PuckCell(false, 'puck__cell--status-success', '5',null))
    drawPuck.addCell(4, new PuckCell(false, 'puck__cell--status-failed', '5',null))
    drawPuck.addCell(5, new PuckCell(false, 'puck__cell--status-success', '4',null));
    drawPuck.addCell(6 , new PuckCell(false, 'puck__cell--status-success', '5',null));
    drawPuck.addCell(8, new PuckCell(false, 'puck__cell--status-failed', '4',null));
    drawPuck.addCell(9, new PuckCell(true, 'puck__cell--disabled', '5',null))
    drawPuck.addCell(11, new PuckCell(true, 'puck__cell--disabled', '5',null));
    drawPuck.addCell(13, new PuckCell(false, 'puck__cell--status-success', '4',null));
    drawPuck.onCellClick(onCellClick);
    drawPuck.onCellHover(onCellHover)
}
   

/**
 *
 * @param {number} cellIndex
 */
function onCellClick(cellIndex) {
    console.info('Clicked on: ' + cellIndex);
}

function onCellHover(cellIndex) {
    console.info('Mouse over: ' + cellIndex);
}