import Chessboard from './chessboard';
import PieceType from './pieces/enum/piece';

describe('Chessboard', () => {
  let chessboard: Chessboard;

  beforeEach(() => {
    chessboard = new Chessboard();
  });

  describe('setSelectedTile()', () => {
    it('should set the selected tile with the selected piece', () => {
      chessboard.setSelectedTilePiece({ row: 5, col: 2 }, PieceType.Rook);

      expect(chessboard.getBoard()[5][2].getPieceType()).toBe(PieceType.Rook);
    });

    it('should set all other tiles to the null piece', () => {
      chessboard.setSelectedTilePiece({ row: 5, col: 2 }, PieceType.Rook);

      expect(chessboard.getBoard()[5][2].getPieceType()).toBe(PieceType.Rook);

      chessboard.setSelectedTilePiece({ row: 7, col: 5 }, PieceType.Knight);

      expect(chessboard.getBoard()[5][2].getPieceType()).toBe(PieceType.Null);
      expect(chessboard.getBoard()[7][5].getPieceType()).toBe(PieceType.Knight);
    });
  });

  describe('getValidTiles()', () => {
    it('should get all valid tiles for the selected index', () => {
      chessboard.setSelectedTilePiece({ row: 5, col: 2 }, PieceType.Bishop);
      const validTiles = chessboard.getValidTileIndexes({ row: 5, col: 2 });

      expect(validTiles.length).toBe(11);
    });
  });
});
