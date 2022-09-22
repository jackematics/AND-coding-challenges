import Knight from './knight';

describe('Rook', () => {
  describe('getValidTiles()', () => {
    it("should have all tiles in an L shape around the knight's position", () => {
      const knight = new Knight({ row: 3, col: 4 });

      expect(knight.getValidTileIndexes().length).toBe(8);
      expect(knight.getValidTileIndexes()[0]).toStrictEqual({
        row: 1,
        col: 3,
      });
      expect(knight.getValidTileIndexes()[1]).toStrictEqual({
        row: 1,
        col: 5,
      });
      expect(knight.getValidTileIndexes()[2]).toStrictEqual({
        row: 2,
        col: 6,
      });
      expect(knight.getValidTileIndexes()[3]).toStrictEqual({
        row: 4,
        col: 6,
      });
      expect(knight.getValidTileIndexes()[4]).toStrictEqual({
        row: 5,
        col: 5,
      });
      expect(knight.getValidTileIndexes()[5]).toStrictEqual({
        row: 5,
        col: 3,
      });
      expect(knight.getValidTileIndexes()[6]).toStrictEqual({
        row: 4,
        col: 2,
      });
      expect(knight.getValidTileIndexes()[7]).toStrictEqual({
        row: 2,
        col: 2,
      });
    });

    it('should have some valid tiles removed if they go out of bounds', () => {
      const knight = new Knight({ row: 0, col: 7 });

      expect(knight.getValidTileIndexes().length).toBe(2);
    });
  });
});
