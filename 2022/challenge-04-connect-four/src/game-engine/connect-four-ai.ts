import ConnectFour from "./connect-four";
import Disk from "./disk";
import GridIndex from "./grid-index";

class ConnectFourAi {
  private readonly currentGame: ConnectFour;
  private readonly aiDisk: Disk;

  constructor(game: ConnectFour, aiDisk: Disk) {
    this.currentGame = game;
    this.aiDisk = aiDisk;
  }

  public calculateConnectFourMovesLeft(gridIndex: GridIndex): number {
    // const horizontalMovesLeft = this.calculateHorizontalMovesLeft(row, column);
    // const verticalMovesLeft = this.calculateVerticalMovesLeft(row, column);
    // const upRightDiagonalMovesLeft = calculateUpRightDiagonalMovesLeft();
    // const upLeftDiagonalMovesLeft = calculateUpLeftDiagonalMovesLeft();

    return 0;
  }

  public calculateHorizontalMovesLeft(gridIndex: GridIndex): number {
    let allPermutationsMovesLeft: number[] = [];

    for (
      let currentPermutation: number = 0;
      currentPermutation < this.currentGame.getWinCount();
      currentPermutation++
    ) {
      let currentPermutationMovesLeft: number = this.currentGame.getWinCount();

      for (
        let currentColumn: number = gridIndex.column - currentPermutation;
        currentColumn <
        this.currentGame.getWinCount() + gridIndex.column - currentPermutation;
        currentColumn++
      ) {
        if (this.outOfColumnBounds(currentColumn)) break;
        if (
          this.currentGame.getGrid()[gridIndex.row][currentColumn] ===
          Disk.EMPTY
        )
          continue;
        if (
          this.currentGame.getGrid()[gridIndex.row][currentColumn] !==
          this.aiDisk
        ) {
          currentPermutationMovesLeft = this.currentGame.getWinCount();
          break;
        }

        currentPermutationMovesLeft--;
      }

      allPermutationsMovesLeft.push(currentPermutationMovesLeft);
    }

    return Math.min(...allPermutationsMovesLeft);
  }

  public calculateVerticalMovesLeft(gridIndex: GridIndex): number {
    let allPermutationsMovesLeft: number[] = [];

    for (let i: number = 0; i < this.currentGame.getWinCount(); i++) {
      let currentPermutationMovesLeft: number = this.currentGame.getWinCount();

      for (
        let currentRow: number = gridIndex.row - i;
        currentRow < this.currentGame.getWinCount() + gridIndex.row - i;
        currentRow++
      ) {
        if (this.outOfRowBounds(currentRow)) break;
        if (
          this.currentGame.getGrid()[currentRow][gridIndex.column] ===
          Disk.EMPTY
        )
          continue;
        if (
          this.currentGame.getGrid()[currentRow][gridIndex.column] !==
          this.aiDisk
        ) {
          currentPermutationMovesLeft = this.currentGame.getWinCount();
          break;
        }

        currentPermutationMovesLeft--;
      }

      allPermutationsMovesLeft.push(currentPermutationMovesLeft);
    }

    return Math.min(...allPermutationsMovesLeft);
  }

  public calculateUpRightDiagonalMovesLeft(gridIndex: GridIndex): number {
    let allPermutationsMovesLeft: number[] = [];

    for (let i: number = 0; i < this.currentGame.getWinCount(); i++) {
      let currentPermutationMovesLeft: number = this.currentGame.getWinCount();

      for (
        let currentColumn: number = gridIndex.column - i,
          currentRow: number = gridIndex.row - i;
        (currentColumn && currentRow) <
        this.currentGame.getWinCount() + gridIndex.column - i;
        currentColumn++, currentRow++
      ) {
        if (
          this.outOfColumnBounds(currentColumn) ||
          this.outOfRowBounds(currentRow)
        )
          break;
        if (
          this.currentGame.getGrid()[currentRow][currentColumn] === Disk.EMPTY
        )
          continue;
        if (
          this.currentGame.getGrid()[currentRow][currentColumn] !== this.aiDisk
        ) {
          currentPermutationMovesLeft = this.currentGame.getWinCount();
          break;
        }

        currentPermutationMovesLeft--;
      }

      allPermutationsMovesLeft.push(currentPermutationMovesLeft);
    }

    return Math.min(...allPermutationsMovesLeft);
  }

  private outOfColumnBounds(column: number): boolean {
    return column < 0 || column >= this.currentGame.getGrid()[0].length;
  }

  private outOfRowBounds(row: number): boolean {
    return row < 0 || row >= this.currentGame.getGrid().length;
  }
}

export default ConnectFourAi;
