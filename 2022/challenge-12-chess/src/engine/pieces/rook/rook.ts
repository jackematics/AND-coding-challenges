import Tile from '../../tile';
import { BoardIndex } from '../../types/board-index';
import PieceType from '../enum/piece';
import IPiece from '../ipiece';
import ValidTileUtils from '../valid-tile-utils';

export default class Rook implements IPiece {
  private readonly boardIndex: BoardIndex;
  private readonly pieceType: PieceType = PieceType.Rook;
  private validTileIndexes: BoardIndex[];

  constructor(boardIndex: BoardIndex) {
    this.boardIndex = boardIndex;

    this.validTileIndexes = this.setValidTileIndexes();
  }

  public getValidTileIndexes(): BoardIndex[] {
    return this.validTileIndexes;
  }

  public getType(): PieceType {
    return this.pieceType;
  }

  private setValidTileIndexes(): BoardIndex[] {
    return [
      ...ValidTileUtils.getVerticalTileIndexes(this.boardIndex),
      ...ValidTileUtils.getHorizontalTileIndexes(this.boardIndex),
    ];
  }
}
