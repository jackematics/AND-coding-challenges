import PieceType from '../enum/piece';
import Tile from '../../tile';
import { BoardIndex } from '../../types/board-index';
import IPiece from '../ipiece';

export default class King implements IPiece {
  private readonly boardIndex: BoardIndex;
  private readonly pieceType: PieceType = PieceType.King;
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
    const validTiles = [];
    const { row, col } = this.boardIndex;

    for (let i = row - 1; i <= row + 1; i++) {
      for (let j = col - 1; j <= col + 1; j++) {
        if (!this.isBoardIndex(i, j) && this.inBounds(i, j)) {
          validTiles.push({ row: i, col: j });
        }
      }
    }

    return validTiles;
  }

  private isBoardIndex(row: number, col: number): boolean {
    return row === this.boardIndex.row && col === this.boardIndex.col;
  }

  private inBounds(row: number, col: number): boolean {
    return -1 < row && row < 8 && -1 < col && col < 8;
  }
}
