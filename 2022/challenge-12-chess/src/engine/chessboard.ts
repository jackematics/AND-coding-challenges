import PieceType from '../enums/piece';
import Tile from './tile';
import { BoardIndex } from './types/board-index';

export default class Chessboard {
  private readonly boardDim = 8;
  private readonly board: Tile[][];

  constructor() {
    this.board = [];
    for (let row = 0; row < this.boardDim; row++) {
      let currentRow: Tile[] = [];
      for (let column = 0; column < this.boardDim; column++) {
        currentRow.push(new Tile({ row, col: column }));
      }

      this.board.push(currentRow);
    }
  }

  public getBoard(): Tile[][] {
    return this.board;
  }

  public setSelectedTile(boardIndex: BoardIndex, piece: PieceType): void {
    this.nullAllTilePieces();
    this.board[boardIndex.row][boardIndex.col].setPiece(piece);
  }

  private nullAllTilePieces(): void {
    for (let row = 0; row < this.boardDim; row++) {
      for (let col = 0; col < this.boardDim; col++) {
        this.board[row][col].setPiece(PieceType.Null);
      }
    }
  }
}
