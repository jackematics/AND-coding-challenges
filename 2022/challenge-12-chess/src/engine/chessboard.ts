import PieceType from './pieces/enum/piece';
import Tile from './tile';
import { BoardIndex } from './types/board-index';
import NullPiece from './pieces/null/null-piece';
import PieceFactory from './piece-factory';

export default class Chessboard {
  private readonly boardDim = 8;
  private readonly board: Tile[][];
  private readonly pieceFactory = new PieceFactory();

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

  public setSelectedTilePiece(
    boardIndex: BoardIndex,
    pieceType: PieceType
  ): void {
    this.nullAllTilePieces();
    this.board[boardIndex.row][boardIndex.col].setPiece(
      this.pieceFactory.createPiece(pieceType, boardIndex)
    );
  }

  public getValidTileIndexes(index: BoardIndex): BoardIndex[] {
    return this.board[index.row][index.col].getPiece().getValidTileIndexes();
  }

  private nullAllTilePieces(): void {
    for (let row = 0; row < this.boardDim; row++) {
      for (let col = 0; col < this.boardDim; col++) {
        this.board[row][col].setPiece(new NullPiece());
      }
    }
  }
}
