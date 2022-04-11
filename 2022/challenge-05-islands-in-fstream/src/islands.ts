import GridIndex from "./gridIndex";

export default class Islands {
  private readonly islands: number[][];
  private readonly landSymbol: number = 1;

  constructor(islands: number[][]) {
    this.islands = islands;
  }

  public calculatePerimeter(): number {
    let perimeter: number = 0;
    for (let row: number = 1; row < this.islands.length - 1; row++) {
      for (
        let column: number = 1;
        column < this.islands[0].length - 1;
        column++
      ) {
        const currentIndex: GridIndex = { row, column };
        if (this.isLand(currentIndex)) {
          perimeter += this.calculateUnitPerimeter(currentIndex);
        }
      }
    }
    return perimeter;
  }

  private calculateUnitPerimeter(unitIndex: GridIndex): number {
    const adjacentSquares: GridIndex[] = [
      { row: unitIndex.row, column: unitIndex.column + 1 },
      { row: unitIndex.row + 1, column: unitIndex.column },
      { row: unitIndex.row, column: unitIndex.column - 1 },
      { row: unitIndex.row - 1, column: unitIndex.column },
    ];

    return adjacentSquares.reduce(
      (currentPerimeterValue, currentIndex) =>
        this.isLand(currentIndex)
          ? currentPerimeterValue
          : currentPerimeterValue + 1,
      0
    );
  }

  private isLand(unitIndex: GridIndex): boolean {
    return this.islands[unitIndex.row][unitIndex.column] === this.landSymbol;
  }
}
