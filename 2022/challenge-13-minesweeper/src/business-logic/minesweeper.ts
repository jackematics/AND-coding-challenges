import TileType from '../enums/tile-type';
import GridIndex from '../types/grid-index';
import MinesweeperMetadata from '../types/minesweeper-metadata';
import { IAssigner } from './iassigner';
import Tile from './tile';

export default class Minesweeper {
  private readonly grid: Tile[][] = [];

  constructor(metadata: MinesweeperMetadata, assigner: IAssigner) {
    this.grid = assigner.assign(metadata);
  }

  public getGrid() {
    return this.grid;
  }

  public getTile(gridIndex: GridIndex) {
    return this.grid[gridIndex.row][gridIndex.col];
  }

  public set mineLocation(gridIndex: GridIndex) {
    this.getTile(gridIndex).setType(TileType.Mine);
  }
}
