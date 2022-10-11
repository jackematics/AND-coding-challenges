import TileType from '../enums/tile-type';
import GridIndex from '../types/grid-index';
import IAssigner from './iassigner';
import Tile from './tile';
import GridOperations from './utils/grid-operations';

export default class Minesweeper {
  private grid: Tile[][] = [];
  private readonly assigner: IAssigner;

  constructor(assigner: IAssigner) {
    this.assigner = assigner;
    this.grid = assigner.assign();
  }

  public getGrid() {
    return this.grid;
  }

  public getTile(gridIndex: GridIndex) {
    return this.grid[gridIndex.row][gridIndex.col];
  }

  public gameOver() {
    this.grid.forEach((row) => {
      row.forEach((tile) => {
        if (tile.getType() === TileType.Mine) {
          tile.reveal();
        }
      });
    });
  }

  public revealSurroundingTiles(tile: Tile) {
    tile.reveal();
    const centre = tile.getGridIndex();

    for (let row = centre.row - 1; row <= centre.row + 1; row++) {
      for (let col = centre.col - 1; col <= centre.col + 1; col++) {
        if (GridOperations.tilesHaveSameIndex({ row, col }, centre)) continue;
        if (GridOperations.indexOutOfBounds({ row, col }, this.grid)) continue;

        const currentTile = this.grid[row][col];
        if (!currentTile.isHidden()) continue;

        currentTile.reveal();
        if (
          currentTile.getType() === TileType.Empty &&
          currentTile.getSurroundingMineCount() === 0
        )
          this.revealSurroundingTiles(currentTile);
      }
    }
  }

  public reset() {
    this.grid = this.assigner.assign();
  }

  public gameWin(): boolean {
    let win = true;

    this.grid.forEach((row: Tile[]) => {
      row.forEach((tile: Tile) => {
        if (tile.getType() === TileType.Mine) {
          return;
        }

        if (tile.isHidden()) {
          win = false;
        }
      });
    });

    return win;
  }
}
