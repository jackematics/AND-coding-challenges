import Queen from './queen';

describe('Queen', () => {
  describe('getValidTiles()', () => {
    it("should have all tiles vertically, horizontally and diagonally of the queen's position", () => {
      const queen = new Queen({ row: 3, col: 4 });

      expect(queen.getValidTileIndexes().length).toBe(27);
    });
  });
});
