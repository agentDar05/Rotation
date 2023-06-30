class Puck {
    puckElement;
    rowLengths;
    selectedCellIndexes;
    constructor(puckElement,rowLengths, selectedCellIndexes){
        this.puckElement = puckElement;
        this.rowLengths =rowLengths;
        this.selectedCellIndexes = selectedCellIndexes;
    }
    #degreesToRadians(degree) {
        return degree * Math.PI / 180;
    }
    #calcCellAngleStep(numberOfCellsInRow) {
        return (360 / numberOfCellsInRow)
    }
    #getCellCoords(rowNumber, numberOfCells, cellNumber) {
        const center = this.#getPuckCenter()
        const cellAngle = this.#calcCellAngleStep(numberOfCells) * cellNumber;
        const cellRadius = 15;
        const rowRadius = cellRadius * 2 + 3 + (cellRadius * rowNumber * 2.2);
        const xCoords = center.x + Math.cos(this.#degreesToRadians(cellAngle - 90)) * rowRadius;
        const yCoords = center.y + Math.sin(this.#degreesToRadians(cellAngle - 90)) * rowRadius;
        return new PuckCellCoords(xCoords, yCoords, cellRadius)
    }
    #getPuckCenter(){
        const rect = this.puckElement.getBoundingClientRect();
        const center = { x: rect.width / 2, y: rect.height / 2 }
        return center
    }
    #drawPuckCircle(){
        const diameter = this.rowLengths.length* 60+30+(6*this.rowLengths.length)+5;
        const size = diameter + "px"
        this.puckElement.style.width = size;
        this.puckElement.style.height = size;
    }
    drawButtonPuck() {
        let currentCellNumber = 1
        for (let rowNumber = 0; rowNumber < this.rowLengths.length; rowNumber++) {
            for (let cellNumber = 0; cellNumber < this.rowLengths[rowNumber]; cellNumber++) {
                const coords = this.#getCellCoords(rowNumber, this.rowLengths[rowNumber], cellNumber);
                this.puckElement.insertAdjacentHTML('beforeend', '<button class = "puck__cell">' + (currentCellNumber) + '</button>');
                const lastElement = this.puckElement.lastElementChild;
                
                // if(this.selectedCellInexes.includes(currentCellNumber)){
                //     lastElement.classList.toggle('puck__cell--selected');
                // }
                this.#drawPuckCircle()
                lastElement.addEventListener("click", (event) => {
                    const target = event.target;
                    target.classList.toggle('puck__cell--selected');
                });
                lastElement.style.left = coords.x - 15 + 'px'; // or can be bottom
                lastElement.style.top = coords.y - 15 + 'px'; // or can be right
                currentCellNumber++;
            }
        }
    }
}