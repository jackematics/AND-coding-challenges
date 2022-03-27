import RandomHelper from "../helpers/random-helper";
import ConnectFour from "./connect-four";
import Disk from "./disk";
import GridIndex from "./grid-index";

class ConnectFourAi {
  private readonly currentGame: ConnectFour;
  private aiDisk: Disk;
  private readonly tooHighWeighting = 5;

  constructor(currentGame: ConnectFour, aiDisk: Disk) {
    this.currentGame = currentGame;
    this.aiDisk = aiDisk;
  }

  public setDisk(disk: Disk): void {
    this.aiDisk = disk;
  }

  public getDisk(): Disk {
    return this.aiDisk;
  }

  public dropDiskInOptimalColumn(): void {
    const opponentNearWinIndex: GridIndex = this.getOpponentNearWinIndex();
    if (
      JSON.stringify(opponentNearWinIndex) !==
      JSON.stringify({ row: -1, column: -1 })
    ) {
      this.currentGame.dropDiskInColumn(
        opponentNearWinIndex.column,
        this.aiDisk
      );
    } else {
      this.currentGame.dropDiskInColumn(
        this.calculateOptimalColumn(),
        this.aiDisk
      );
    }
  }

  private getOpponentNearWinIndex(): GridIndex {
    const opponentsDisk = this.aiDisk === Disk.RED ? Disk.YELLOW : Disk.RED;
    for (
      let column: number = 0;
      column < this.currentGame.getGrid()[0].length;
      column++
    ) {
      let currentIndex: GridIndex = {
        row: this.currentGame.calculateRowDropIndex(column),
        column: column,
      };

      let opponentMovesLeft = this.calculateConnectFourMovesLeft(
        currentIndex,
        opponentsDisk
      );

      if (opponentMovesLeft === 1) {
        return currentIndex;
      }
    }

    return { row: -1, column: -1 };
  }

  private calculateOptimalColumn(): number {
    let columnsMovesLeft: number[] = [];
    for (
      let column: number = 0;
      column < this.currentGame.getGrid()[0].length;
      column++
    ) {
      const rowDropIndex = this.currentGame.calculateRowDropIndex(column);

      if (rowDropIndex !== -1) {
        columnsMovesLeft.push(
          this.calculateConnectFourMovesLeft(
            { row: rowDropIndex, column },
            this.aiDisk
          )
        );
      } else {
        columnsMovesLeft.push(this.tooHighWeighting);
      }
    }

    return this.getBestChoiceIndex(columnsMovesLeft);
  }

  private getBestChoiceIndex(columnsMovesLeft: number[]): number {
    const minMovesLeft = Math.min(...columnsMovesLeft);
    let bestChoiceIndexes: number[] = [];

    for (let column: number = 0; column < columnsMovesLeft.length; column++) {
      if (columnsMovesLeft[column] === minMovesLeft) {
        bestChoiceIndexes.push(column);
      }
    }

    return bestChoiceIndexes[
      RandomHelper.getRandomInt(bestChoiceIndexes.length)
    ];
  }

  public calculateConnectFourMovesLeft(
    gridIndex: GridIndex,
    disk: Disk
  ): number {
    return Math.min(
      this.calculateHorizontalMovesLeft(gridIndex, disk),
      this.calculateVerticalMovesLeft(gridIndex, disk),
      this.calculateUpRightDiagonalMovesLeft(gridIndex, disk),
      this.calculateUpLeftDiagonalMovesLeft(gridIndex, disk)
    );
  }

  private calculateHorizontalMovesLeft(
    gridIndex: GridIndex,
    disk: Disk
  ): number {
    let allOffsetsMovesLeft: number[] = [];

    for (
      let currentOffset: number = 0;
      currentOffset < this.currentGame.getWinCount();
      currentOffset++
    ) {
      allOffsetsMovesLeft.push(
        this.calculateOffsetHorizontalMovesLeft(gridIndex, currentOffset, disk)
      );
    }

    return Math.min(...allOffsetsMovesLeft);
  }

  private calculateOffsetHorizontalMovesLeft(
    gridIndex: GridIndex,
    offset: number,
    disk: Disk
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
        this.opponentsDiskAt(
          { row: gridIndex.row, column: currentColumn },
          disk
        )
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

  private calculateVerticalMovesLeft(gridIndex: GridIndex, disk: Disk): number {
    let allOffsetsMovesLeft: number[] = [];

    for (
      let currentOffset: number = 0;
      currentOffset < this.currentGame.getWinCount();
      currentOffset++
    ) {
      allOffsetsMovesLeft.push(
        this.calculateOffsetVerticalMovesLeft(gridIndex, currentOffset, disk)
      );
    }

    return Math.min(...allOffsetsMovesLeft);
  }

  private calculateOffsetVerticalMovesLeft(
    gridIndex: GridIndex,
    offset: number,
    disk: Disk
  ): number {
    let offsetMovesLeft: number = this.currentGame.getWinCount();

    for (
      let currentRow: number = gridIndex.row - offset;
      currentRow < this.currentGame.getWinCount() + gridIndex.row - offset;
      currentRow++
    ) {
      if (
        this.outOfRowBoundsAt(currentRow) ||
        this.opponentsDiskAt(
          { row: currentRow, column: gridIndex.column },
          disk
        )
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

  private calculateUpRightDiagonalMovesLeft(
    gridIndex: GridIndex,
    disk: Disk
  ): number {
    let allOffsetsMovesLeft: number[] = [];

    for (
      let offset: number = 0;
      offset < this.currentGame.getWinCount();
      offset++
    ) {
      const currentOffsetMovesLeft: number =
        this.calculateOffsetUpRightDiagonalMovesLeft(gridIndex, offset, disk);

      allOffsetsMovesLeft.push(currentOffsetMovesLeft);
    }

    return Math.min(...allOffsetsMovesLeft);
  }

  private calculateOffsetUpRightDiagonalMovesLeft(
    gridIndex: GridIndex,
    offset: number,
    disk: Disk
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
        this.opponentsDiskAt(
          {
            row: currentRow,
            column: currentColumn,
          },
          disk
        )
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

  private calculateUpLeftDiagonalMovesLeft(
    gridIndex: GridIndex,
    disk: Disk
  ): number {
    let allOffsetsMovesLeft: number[] = [];

    for (
      let offset: number = 0;
      offset < this.currentGame.getWinCount();
      offset++
    ) {
      const currentOffsetMovesLeft: number =
        this.calculateOffsetUpLeftDiagonalMovesLeft(gridIndex, offset, disk);

      allOffsetsMovesLeft.push(currentOffsetMovesLeft);
    }

    return Math.min(...allOffsetsMovesLeft);
  }

  private calculateOffsetUpLeftDiagonalMovesLeft(
    gridIndex: GridIndex,
    offset: number,
    disk: Disk
  ): number {
    let offsetMovesLeft: number = this.currentGame.getWinCount();

    for (
      let currentColumn: number = gridIndex.column - offset,
        currentRow: number = gridIndex.row - offset;
      (currentColumn && currentRow) <
      this.currentGame.getWinCount() + gridIndex.column - offset;
      currentColumn--, currentRow++
    ) {
      if (
        this.outOfColumnBoundsAt(currentColumn) ||
        this.outOfRowBoundsAt(currentRow) ||
        this.opponentsDiskAt(
          {
            row: currentRow,
            column: currentColumn,
          },
          disk
        )
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

  private opponentsDiskAt(gridIndex: GridIndex, disk: Disk): boolean {
    const opponentsDisk: Disk = disk === Disk.RED ? Disk.YELLOW : Disk.RED;
    return (
      this.currentGame.getGrid()[gridIndex.row][gridIndex.column] ===
      opponentsDisk
    );
  }
}

export default ConnectFourAi;
