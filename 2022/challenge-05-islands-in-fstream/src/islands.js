export default class Islands {
  islands;

  constructor(islands) {
    this.islands = islands;
  }

  calculateTotalPerimeter() {
    let perimeter = 0;
    for (let row = 1; row < this.islands.length - 1; row++) {
      for (let column = 1; column < this.islands[0].length - 1; column++) {
        if (this.islands[row][column] === 1) {
          perimeter += this.calculateUnitPerimeter(row, column);
        }
      }
    }

    return perimeter;
  }

  calculateUnitPerimeter(row, column) {
    return [
      { row, column: column + 1 },
      { row: row + 1, column },
      { row, column: column - 1 },
      { row: row - 1, column },
    ].reduce(
      (currentPerimeterValue, currentIndex) =>
        this.islands[currentIndex.row][currentIndex.column] === 1
          ? currentPerimeterValue
          : currentPerimeterValue + 1,
      0
    );
  }
}
