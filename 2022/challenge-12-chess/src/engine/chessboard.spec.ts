import PieceType from '../enums/piece';
import Chessboard from './chessboard';

describe('Chessboard', () => {
  let chessboard: Chessboard;

  beforeEach(() => {
    chessboard = new Chessboard();
  });

  describe('setSelectedTile()', () => {
    it('should set the selected tile with the selected piece', () => {
      chessboard.setSelectedTile({ row: 5, col: 2 }, PieceType.Rook);

      expect(chessboard.getBoard()[5][2].getPiece()).toBe(PieceType.Rook);
    });

    it('should set all other tiles to the null piece', () => {
      chessboard.setSelectedTile({ row: 5, col: 2 }, PieceType.Rook);

      expect(chessboard.getBoard()[5][2].getPiece()).toBe(PieceType.Rook);

      chessboard.setSelectedTile({ row: 7, col: 5 }, PieceType.Knight);

      expect(chessboard.getBoard()[5][2].getPiece()).toBe(PieceType.Null);
      expect(chessboard.getBoard()[7][5].getPiece()).toBe(PieceType.Knight);
    });
  });
});
