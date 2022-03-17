import Disk from "./disk";
import GridIndex from "./grid-index";

class ConnectFour {
  private readonly gridRowCount = 6;
  private readonly gridColumnCount = 7;

  private grid: Disk[][] = [];

  private lastPlacedDiskIndex: GridIndex = {
    row: -1,
    column: -1,
  };

  constructor() {
    for (let row: number = 0; row < this.gridRowCount; row++) {
      const row: Disk[] = [];
      for (let column: number = 0; column < this.gridColumnCount; column++) {
        row.push(Disk.EMPTY);
      }

      this.grid.push(row);
    }
  }

  public getGrid(): Disk[][] {
    return this.grid;
  }

  public dropDiskInColumn(column: number, disk: Disk): void {
    this.handleDropErrors(column, disk);

    const rowDropIndex: number = this.calculateRowDropIndex(column);
    this.grid[rowDropIndex][column] = disk;
  }

  private handleDropErrors(column: number, disk: Disk): void {
    if (column < 0 || column > 6) {
      throw new Error("Must drop disk in grid bounds");
    }

    if (disk === Disk.EMPTY) {
      throw new Error("Cannot drop an empty disk");
    }
  }

  private calculateRowDropIndex(column: number): number {
    for (let i: number = this.gridRowCount - 1; i >= 0; i--) {
      if (this.grid[i][column] === Disk.EMPTY) {
        this.lastPlacedDiskIndex = {
          row: i,
          column,
        };

        return i;
      }
    }

    throw new Error("Cannot drop disk into a full column");
  }
}

export default ConnectFour;
