import TileType from '../enums/tile-type';
import GridIndex from '../types/grid-index';
import Tile from './tile';

interface MinesweeperMetadata {
  rows: number;
  cols: number;
  mines: number;
}

export default class Minesweeper {
  private mines: number;
  private readonly grid: Tile[][] = [];

  constructor(metadata: MinesweeperMetadata) {
    this.mines = metadata.mines;

    for (let row = 0; row < metadata.rows; row++) {
      let currentRow = [];
      for (let col = 0; col < metadata.cols; col++) {
        currentRow.push(new Tile(TileType.Empty, { row, col }));
      }

      this.grid.push(currentRow);
    }
  }

  public getGrid() {
    return this.grid;
  }

  public getTile(gridIndex: GridIndex) {
    return this.grid[gridIndex.row][gridIndex.col];
  }

  public set mineLocation(gridIndex: GridIndex) {
    if (this.mines <= 0) throw new Error('no more mines available to place');

    this.getTile(gridIndex).setType(TileType.Mine);
    this.mines--;
  }
}
