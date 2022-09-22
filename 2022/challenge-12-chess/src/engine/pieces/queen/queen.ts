import Tile from '../../tile';
import { BoardIndex } from '../../types/board-index';
import PieceType from '../enum/piece';
import IPiece from '../ipiece';
import ValidTileUtils from '../valid-tile-utils';

export default class Queen implements IPiece {
  private readonly boardIndex: BoardIndex;
  private readonly pieceType: PieceType = PieceType.Queen;
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
    const verticalTileIndexes = ValidTileUtils.getVerticalTileIndexes(
      this.boardIndex
    );
    const horizontalTileIndexes = ValidTileUtils.getHorizontalTileIndexes(
      this.boardIndex
    );

    return [
      ...topLeftTileIndexes,
      ...topRightTileIndexes,
      ...bottomLeftTileIndexes,
      ...bottomRightTileIndexes,
      ...verticalTileIndexes,
      ...horizontalTileIndexes,
    ];
  }
}
