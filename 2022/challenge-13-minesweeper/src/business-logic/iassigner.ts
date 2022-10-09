import MinesweeperMetadata from '../types/minesweeper-metadata';
import Tile from './tile';

export interface IAssigner {
  assign: (metadata: MinesweeperMetadata) => Tile[][];
}
