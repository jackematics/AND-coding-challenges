import Bishop from './bishop';

describe('Bishop', () => {
  describe('getValidTiles()', () => {
    it('should have get all diagonal tiles', () => {
      const bishop = new Bishop({ row: 3, col: 4 });

      expect(bishop.getValidTileIndexes().length).toBe(13);
    });
  });
});
