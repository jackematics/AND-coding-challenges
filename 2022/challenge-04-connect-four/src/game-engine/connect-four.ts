import Disk from "./disk";
import GridIndex from "./grid-index";

class ConnectFour {
  private readonly winCount = 4;
  private readonly gridRowCount = 6;
  private readonly gridColumnCount = 7;
  private grid: Disk[][] = [];
  private lastPlacedDiskIndex: GridIndex = {
    row: -1,
    column: -1,
  };

  constructor() {
    this.initialiseGrid();
  }

  public initialiseGrid(): void {
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

  public getWinCount(): number {
    return this.winCount;
  }

  public dropDiskInColumn(column: number, disk: Disk): void {
    this.handleDropErrors(column, disk);

    const rowDropIndex: number = this.calculateRowDropIndex(column);
    this.lastPlacedDiskIndex = {
      row: rowDropIndex,
      column,
    };

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

  public calculateRowDropIndex(column: number): number {
    for (let row: number = this.gridRowCount - 1; row >= 0; row--) {
      if (this.grid[row][column] === Disk.EMPTY) {
        return row;
      }
    }

    return -1;
  }

  public isConnectFour(disk: Disk): boolean {
    return (
      this.isHorizontalConnectFour(disk) ||
      this.isVerticalConnectFour(disk) ||
      this.isUpRightDiagonalConnectFour(disk) ||
      this.isUpLeftDiagonalConnectFour(disk)
    );
  }

  private isHorizontalConnectFour(disk: Disk): boolean {
    let consecutive: number = 0;
    for (let column: number = 0; column < this.gridColumnCount; column++) {
      consecutive =
        this.grid[this.lastPlacedDiskIndex.row][column] === disk
          ? consecutive + 1
          : 0;

      if (consecutive === this.winCount) {
        return true;
      }
    }

    return false;
  }

  private isVerticalConnectFour(disk: Disk): boolean {
    let consecutive: number = 0;
    for (let row: number = 0; row < this.gridRowCount; row++) {
      consecutive =
        this.grid[row][this.lastPlacedDiskIndex.column] === disk
          ? consecutive + 1
          : 0;

      if (consecutive === this.winCount) {
        return true;
      }
    }

    return false;
  }

  private isUpRightDiagonalConnectFour(disk: Disk): boolean {
    let consecutive: number = 0;
    const currentGridIndex: GridIndex =
      this.calculateInitialDownLeftGridIndex();

    while (
      currentGridIndex.row !== -1 &&
      currentGridIndex.column !== this.gridColumnCount
    ) {
      consecutive =
        this.grid[currentGridIndex.row][currentGridIndex.column] === disk
          ? consecutive + 1
          : 0;

      if (consecutive === this.winCount) {
        return true;
      }

      currentGridIndex.row--;
      currentGridIndex.column++;
    }

    return false;
  }

  private isUpLeftDiagonalConnectFour(disk: Disk): boolean {
    let consecutive: number = 0;
    const currentGridIndex: GridIndex =
      this.calculateInitialDownRightGridIndex();

    while (currentGridIndex.row !== -1 && currentGridIndex.column !== -1) {
      consecutive =
        this.grid[currentGridIndex.row][currentGridIndex.column] === disk
          ? consecutive + 1
          : 0;

      if (consecutive === this.winCount) {
        return true;
      }

      currentGridIndex.row--;
      currentGridIndex.column--;
    }

    return false;
  }

  private calculateInitialDownLeftGridIndex(): GridIndex {
    let currentGridIndex: GridIndex = JSON.parse(
      JSON.stringify(this.lastPlacedDiskIndex)
    );

    while (
      currentGridIndex.row !== this.gridRowCount - 1 &&
      currentGridIndex.column !== 0
    ) {
      currentGridIndex.row++;
      currentGridIndex.column--;
    }

    return currentGridIndex;
  }

  private calculateInitialDownRightGridIndex(): GridIndex {
    let currentGridIndex: GridIndex = JSON.parse(
      JSON.stringify(this.lastPlacedDiskIndex)
    );

    while (
      currentGridIndex.row !== this.gridRowCount - 1 &&
      currentGridIndex.column !== this.gridColumnCount - 1
    ) {
      currentGridIndex.row++;
      currentGridIndex.column++;
    }

    return currentGridIndex;
  }

  public reset(): void {
    this.grid = [];
    this.initialiseGrid();
  }
}

export default ConnectFour;
