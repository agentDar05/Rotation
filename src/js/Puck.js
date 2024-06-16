class Puck {
    #puckElement;
    #rowLengths;
    #selectedCellIndexes;
    #onCellClickCb = [];
    #onCellHoverCb = [];
    #cellElements = [];
    constructor(puckElement,rowLengths, selectedCellIndexes){
        this.#puckElement = puckElement;
        this.#rowLengths = rowLengths;
        this.#selectedCellIndexes = selectedCellIndexes;
    }
    addCell(cellIdx, puckCell){
        const cellElement = this.#cellElements[cellIdx-1];
        cellElement.classList.add(puckCell.cssClass);
        cellElement.disabled = puckCell.disabled
    }
    draw() {
        let currentCellNumber = 1;
        this.#drawPuckCircle();
        const center = this.#getPuckCenter();
        for (let rowNumber = 0; rowNumber < this.#rowLengths.length; rowNumber++) {
            for (let cellNumber = this.#rowLengths[rowNumber]; cellNumber >= 1; cellNumber--) {
                this.#puckElement.insertAdjacentHTML('beforeend',
                    `<button class = "puck__cell puck__cell--no-status">${currentCellNumber}</button>`);
                const lastElement = this.#puckElement.lastElementChild;
                this.#cellElements.push(lastElement);
                if(this.#selectedCellIndexes.includes(currentCellNumber)){
                    lastElement.classList.toggle('puck__cell--selected');
                }
                lastElement.addEventListener("mouseover", (event) => {
                    for (const cb of this.#onCellHoverCb) {
                        cb(parseInt(event.target.textContent))
                    }
                });
                lastElement.addEventListener("click", (event) => {
                    event.target.classList.toggle('puck__cell--selected');
                    for (const cb of this.#onCellClickCb) {
                        cb(parseInt(event.target.textContent))
                    }
                    
                });
                const coords = this.#getCellCoords(rowNumber, this.#rowLengths[rowNumber], cellNumber, center);
                lastElement.style.left = coords.x - 15 + 'px'; // or can be bottom
                lastElement.style.top = coords.y - 15 + 'px'; // or can be right
                currentCellNumber++;
            }
        }
    }
    onCellHover(cb) {
        this.#onCellHoverCb.push(cb);
    }
    onCellClick(cb) {
        this.#onCellClickCb.push(cb);
    }

    #degreesToRadians(degree) {
        return degree * Math.PI / 180;
    }
    #calcCellAngleStep(numberOfCellsInRow) {
        return (360 / numberOfCellsInRow)
    }
    #getCellCoords(rowNumber, numberOfCells, cellNumber, center) {
        const cellAngle = this.#calcCellAngleStep(numberOfCells) * cellNumber;
        const cellRadius = 15;
        const rowRadius = cellRadius * 2 + 3 + (cellRadius * rowNumber * 2.2);
        const xCoords = center.x + Math.cos(this.#degreesToRadians(cellAngle - 90)) * rowRadius;
        const yCoords = center.y + Math.sin(this.#degreesToRadians(cellAngle - 90)) * rowRadius;
        return new PuckCellCoords(xCoords, yCoords, cellRadius)
    }
    #getPuckCenter(){
        const rect = this.#puckElement.getBoundingClientRect();
        return {x: rect.width / 2, y: rect.height / 2}
    }
    #drawPuckCircle(){
        const diameter = this.#rowLengths.length* 60+30+(6*this.#rowLengths.length)+5;
        const size = diameter + "px"
        this.#puckElement.style.width = size;
        this.#puckElement.style.height = size;
    }
}