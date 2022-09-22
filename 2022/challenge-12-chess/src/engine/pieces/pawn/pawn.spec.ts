import Pawn from './pawn';

describe('Pawn', () => {
  describe('getValidTiles()', () => {
    it('should have no valid tiles if it is in the last row', () => {
      const pawn = new Pawn({ row: 0, col: 0 });

      expect(pawn.getValidTileIndexes().length).toBe(0);
    });

    it('should have two valid tiles in front if it is in the second row', () => {
      const pawn = new Pawn({ row: 6, col: 0 });

      expect(pawn.getValidTileIndexes().length).toBe(2);
      expect(pawn.getValidTileIndexes()[0]).toStrictEqual({
        row: 5,
        col: 0,
      });
      expect(pawn.getValidTileIndexes()[1]).toStrictEqual({
        row: 4,
        col: 0,
      });
    });

    it('should have one valid tile in front otherwise', () => {
      const pawn = new Pawn({ row: 5, col: 0 });

      expect(pawn.getValidTileIndexes().length).toBe(1);
      expect(pawn.getValidTileIndexes()[0]).toStrictEqual({
        row: 4,
        col: 0,
      });
    });
  });
});
