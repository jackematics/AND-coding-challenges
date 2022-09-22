import Tile from '../../tile';
import { BoardIndex } from '../../types/board-index';
import PieceType from '../enum/piece';
import IPiece from '../ipiece';

export default class NullPiece implements IPiece {
  public getValidTileIndexes(): BoardIndex[] {
    return [];
  }

  public getType(): PieceType {
    return PieceType.Null;
  }
}
