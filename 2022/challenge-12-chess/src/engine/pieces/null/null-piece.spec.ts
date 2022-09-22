import NullPiece from './null-piece';

describe('NullPiece', () => {
  describe('getValidTiles()', () => {
    it('should return an empty array', () => {
      const nullPiece = new NullPiece();

      expect(nullPiece.getValidTileIndexes().length).toBe(0);
    });
  });
});
