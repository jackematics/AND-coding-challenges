import ConnectFour from "./connect-four";
import Disk from "./disk";
import GridIndex from "./grid-index";

class ConnectFourAi {
  private readonly currentGame: ConnectFour;
  private readonly aiDisk: Disk;
  private readonly tooHighWeighting = 5;

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
    let allOffsetsMovesLeft: number[] = [];

    for (
      let currentOffset: number = 0;
      currentOffset < this.currentGame.getWinCount();
      currentOffset++
    ) {
      allOffsetsMovesLeft.push(
        this.calculateOffsetHorizontalMovesLeft(gridIndex, currentOffset)
      );
    }

    return Math.min(...allOffsetsMovesLeft);
  }

  private calculateOffsetHorizontalMovesLeft(
    gridIndex: GridIndex,
    offset: number
  ): number {
    let offsetMovesLeft: number = this.currentGame.getWinCount();

    for (
      let currentColumn: number = gridIndex.column - offset;
      currentColumn <
      this.currentGame.getWinCount() + gridIndex.column - offset;
      currentColumn++
    ) {
      if (
        this.outOfColumnBoundsAt(currentColumn) ||
        this.opponentsDiskAt({ row: gridIndex.row, column: currentColumn })
      ) {
        offsetMovesLeft = this.tooHighWeighting;
        break;
      }
      if (this.emptyDiskAt({ row: gridIndex.row, column: currentColumn }))
        continue;

      offsetMovesLeft--;
    }

    return offsetMovesLeft;
  }

  public calculateVerticalMovesLeft(gridIndex: GridIndex): number {
    let allOffsetsMovesLeft: number[] = [];

    for (
      let currentOffset: number = 0;
      currentOffset < this.currentGame.getWinCount();
      currentOffset++
    ) {
      allOffsetsMovesLeft.push(
        this.calculateOffsetVerticalMovesLeft(gridIndex, currentOffset)
      );
    }

    return Math.min(...allOffsetsMovesLeft);
  }

  private calculateOffsetVerticalMovesLeft(
    gridIndex: GridIndex,
    offset: number
  ): number {
    let offsetMovesLeft: number = this.currentGame.getWinCount();

    for (
      let currentRow: number = gridIndex.row - offset;
      currentRow < this.currentGame.getWinCount() + gridIndex.row - offset;
      currentRow++
    ) {
      if (
        this.outOfRowBoundsAt(currentRow) ||
        this.opponentsDiskAt({ row: currentRow, column: gridIndex.column })
      ) {
        offsetMovesLeft = this.tooHighWeighting;
        break;
      }
      if (this.emptyDiskAt({ row: currentRow, column: gridIndex.column }))
        continue;

      offsetMovesLeft--;
    }

    return offsetMovesLeft;
  }

  public calculateUpRightDiagonalMovesLeft(gridIndex: GridIndex): number {
    let allOffsetsMovesLeft: number[] = [];

    for (
      let offset: number = 0;
      offset < this.currentGame.getWinCount();
      offset++
    ) {
      const currentOffsetMovesLeft: number =
        this.calculateOffsetUpRightDiagonalMovesLeft(gridIndex, offset);

      allOffsetsMovesLeft.push(currentOffsetMovesLeft);
    }

    return Math.min(...allOffsetsMovesLeft);
  }

  private calculateOffsetUpRightDiagonalMovesLeft(
    gridIndex: GridIndex,
    offset: number
  ): number {
    let offsetMovesLeft: number = this.currentGame.getWinCount();

    for (
      let currentColumn: number = gridIndex.column - offset,
        currentRow: number = gridIndex.row - offset;
      (currentColumn && currentRow) <
      this.currentGame.getWinCount() + gridIndex.column - offset;
      currentColumn++, currentRow++
    ) {
      if (
        this.outOfColumnBoundsAt(currentColumn) ||
        this.outOfRowBoundsAt(currentRow) ||
        this.opponentsDiskAt({
          row: currentRow,
          column: currentColumn,
        })
      ) {
        offsetMovesLeft = this.tooHighWeighting;
        break;
      }
      if (this.emptyDiskAt({ row: currentRow, column: currentColumn }))
        continue;

      offsetMovesLeft--;
    }

    return offsetMovesLeft;
  }

  private outOfColumnBoundsAt(column: number): boolean {
    return column < 0 || column >= this.currentGame.getGrid()[0].length;
  }

  private outOfRowBoundsAt(row: number): boolean {
    return row < 0 || row >= this.currentGame.getGrid().length;
  }

  private emptyDiskAt(gridIndex: GridIndex): boolean {
    return (
      this.currentGame.getGrid()[gridIndex.row][gridIndex.column] === Disk.EMPTY
    );
  }

  private opponentsDiskAt(gridIndex: GridIndex): boolean {
    const opponentsDisk: Disk =
      this.aiDisk === Disk.RED ? Disk.YELLOW : Disk.RED;
    return (
      this.currentGame.getGrid()[gridIndex.row][gridIndex.column] ===
      opponentsDisk
    );
  }
}

export default ConnectFourAi;
