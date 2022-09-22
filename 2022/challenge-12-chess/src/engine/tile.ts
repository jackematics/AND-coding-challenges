import PieceType from './pieces/enum/piece';
import IPiece from './pieces/ipiece';
import NullPiece from './pieces/null/null-piece';
import { BoardIndex } from './types/board-index';

export default class Tile {
  private readonly boardIndex: BoardIndex;
  private readonly maxRank: number = 8;
  private piece: IPiece = new NullPiece();
  private readonly conversions = {
    1: 'A',
    2: 'B',
    3: 'C',
    4: 'D',
    5: 'E',
    6: 'F',
    7: 'G',
    8: 'H',
  };

  constructor(gridIndex: BoardIndex) {
    this.boardIndex = gridIndex;
  }

  public getBoardIndex(): BoardIndex {
    return this.boardIndex;
  }

  public getPiece(): IPiece {
    return this.piece;
  }

  public getPieceType(): PieceType {
    return this.piece.getType();
  }

  public setPiece(piece: IPiece): void {
    this.piece = piece;
  }

  public getName(): string {
    return this.getRank() + this.getFile();
  }

  private getRank(): string {
    // @ts-ignore
    return this.conversions[this.boardIndex.col + 1];
  }

  private getFile(): string {
    return (this.maxRank - this.boardIndex.row).toString();
  }
}
