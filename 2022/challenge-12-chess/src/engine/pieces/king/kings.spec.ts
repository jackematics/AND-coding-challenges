import King from './king';

describe('King', () => {
  describe('getValidTiles()', () => {
    it('should valid tiles one tile in all directions', () => {
      const king = new King({ row: 2, col: 3 });

      expect(king.getValidTileIndexes().length).toBe(8);
    });
  });
});
