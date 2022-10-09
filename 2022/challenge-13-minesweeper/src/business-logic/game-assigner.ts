import TileType from '../enums/tile-type';
import MinesweeperMetadata from '../types/minesweeper-metadata';
import { IAssigner } from './iassigner';
import Tile from './tile';

export default class GameAssigner implements IAssigner {
  public assign(metadata: MinesweeperMetadata): Tile[][] {
    const grid: Tile[][] = [];

    for (let row = 0; row < metadata.rows; row++) {
      let currentRow = [];
      for (let col = 0; col < metadata.cols; col++) {
        currentRow.push(new Tile(TileType.Empty, { row, col }));
      }

      grid.push(currentRow);
    }

    return grid;
  }
}
