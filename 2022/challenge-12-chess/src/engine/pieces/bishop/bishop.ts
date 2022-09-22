import Tile from '../../tile';
import { BoardIndex } from '../../types/board-index';
import PieceType from '../enum/piece';
import IPiece from '../ipiece';
import ValidTileUtils from '../valid-tile-utils';

export default class Bishop implements IPiece {
  private readonly boardIndex: BoardIndex;
  private readonly pieceType: PieceType = PieceType.Bishop;
  private validTileIndexes: BoardIndex[];

  constructor(boardIndex: BoardIndex) {
    this.boardIndex = boardIndex;

    this.validTileIndexes = this.setValidTiles();
  }

  public getValidTileIndexes(): BoardIndex[] {
    return this.validTileIndexes;
  }

  public getType(): PieceType {
    return this.pieceType;
  }

  private setValidTiles(): BoardIndex[] {
    const topLeftTileIndexes = ValidTileUtils.getDiagonalTileIndexes({
      boardIndex: this.boardIndex,
      rowDelta: -1,
      colDelta: -1,
      rowOutOfBounds: -1,
      colOutOfBounds: -1,
    });
    const topRightTileIndexes = ValidTileUtils.getDiagonalTileIndexes({
      boardIndex: this.boardIndex,
      rowDelta: -1,
      colDelta: +1,
      rowOutOfBounds: -1,
      colOutOfBounds: 8,
    });
    const bottomRightTileIndexes = ValidTileUtils.getDiagonalTileIndexes({
      boardIndex: this.boardIndex,
      rowDelta: +1,
      colDelta: +1,
      rowOutOfBounds: 8,
      colOutOfBounds: 8,
    });
    const bottomLeftTileIndexes = ValidTileUtils.getDiagonalTileIndexes({
      boardIndex: this.boardIndex,
      rowDelta: +1,
      colDelta: -1,
      rowOutOfBounds: 8,
      colOutOfBounds: -1,
    });

    return [
      ...topLeftTileIndexes,
      ...topRightTileIndexes,
      ...bottomLeftTileIndexes,
      ...bottomRightTileIndexes,
    ];
  }
}
