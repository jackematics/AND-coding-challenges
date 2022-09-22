import PieceType from './enum/piece';
import { BoardIndex } from '../types/board-index';

export default interface IPiece {
  getValidTileIndexes(): BoardIndex[];
  getType(): PieceType;
}
