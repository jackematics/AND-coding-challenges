import Bishop from './pieces/bishop/bishop';
import PieceType from './pieces/enum/piece';
import IPiece from './pieces/ipiece';
import King from './pieces/king/king';
import Knight from './pieces/knight/knight';
import NullPiece from './pieces/null/null-piece';
import Pawn from './pieces/pawn/pawn';
import Queen from './pieces/queen/queen';
import Rook from './pieces/rook/rook';
import { BoardIndex } from './types/board-index';

export default class PieceFactory {
  public createPiece(type: PieceType, index: BoardIndex): IPiece {
    switch (type) {
      case PieceType.Pawn:
        return new Pawn(index);

      case PieceType.Rook:
        return new Rook(index);

      case PieceType.Knight:
        return new Knight(index);

      case PieceType.Bishop:
        return new Bishop(index);

      case PieceType.Queen:
        return new Queen(index);

      case PieceType.King:
        return new King(index);

      case PieceType.Null:
        return new NullPiece();

      default:
        throw new Error('Invalid piece type');
    }
  }
}
