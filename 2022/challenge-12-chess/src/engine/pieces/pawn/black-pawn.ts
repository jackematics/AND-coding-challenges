import PieceType from '../enum/piece';
import Tile from '../../tile';
import { BoardIndex } from '../../types/board-index';
import IPiece from '../ipiece';

export default class BlackPawn implements IPiece {
  private readonly boardIndex: BoardIndex;
  private readonly pieceType: PieceType = PieceType.BlackPawn;
  private validTilesIndexes: BoardIndex[];

  constructor(boardIndex: BoardIndex) {
    this.boardIndex = boardIndex;

    this.validTilesIndexes = this.setValidTileIndexes();
  }

  public getValidTileIndexes(): BoardIndex[] {
    return this.validTilesIndexes;
  }

  public getType(): PieceType {
    return this.pieceType;
  }

  private setValidTileIndexes(): BoardIndex[] {
    const validTileIndexes = [];
    const { row, col } = this.boardIndex;
    if (row !== 7) validTileIndexes.push({ row: row + 1, col });

    if (row === 1) validTileIndexes.push({ row: row + 2, col });

    return validTileIndexes;
  }
}
