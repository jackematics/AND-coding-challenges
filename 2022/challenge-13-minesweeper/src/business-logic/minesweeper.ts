import TileType from '../enums/tile-type';
import GridIndex from '../types/grid-index';
import IAssigner from './iassigner';
import Tile from './tile';

export default class Minesweeper {
  private readonly grid: Tile[][] = [];

  constructor(assigner: IAssigner) {
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
}
