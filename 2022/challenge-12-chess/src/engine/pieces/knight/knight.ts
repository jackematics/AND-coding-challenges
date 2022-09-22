import Tile from '../../tile';
import { BoardIndex } from '../../types/board-index';
import PieceType from '../enum/piece';
import IPiece from '../ipiece';

export default class Knight implements IPiece {
  private readonly boardIndex: BoardIndex;
  private readonly pieceType: PieceType = PieceType.Knight;
  private validTiles: BoardIndex[];

  constructor(boardIndex: BoardIndex) {
    this.boardIndex = boardIndex;
    this.validTiles = this.setValidTiles();
  }

  public getValidTileIndexes(): BoardIndex[] {
    return this.validTiles;
  }

  public getType(): PieceType {
    return this.pieceType;
  }

  private setValidTiles(): BoardIndex[] {
    const validTiles = [];
    const { row, col } = this.boardIndex;
    const max = 7;
    const min = 0;

    if (row > min + 1) {
      if (col > min) validTiles.push({ row: row - 2, col: col - 1 });
      if (col < max) validTiles.push({ row: row - 2, col: col + 1 });
    }

    if (col < max - 1) {
      if (row > min) validTiles.push({ row: row - 1, col: col + 2 });
      if (row < max) validTiles.push({ row: row + 1, col: col + 2 });
    }

    if (row < max - 1) {
      if (col < max) validTiles.push({ row: row + 2, col: col + 1 });
      if (col > min) validTiles.push({ row: row + 2, col: col - 1 });
    }

    if (col > min + 1) {
      if (row < max) validTiles.push({ row: row + 1, col: col - 2 });
      if (row > min) validTiles.push({ row: row - 1, col: col - 2 });
    }

    return validTiles;
  }
}
