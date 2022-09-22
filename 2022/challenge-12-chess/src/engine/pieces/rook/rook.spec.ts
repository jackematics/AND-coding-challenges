import Rook from './rook';

describe('Rook', () => {
  describe('getValidTiles()', () => {
    it("should have all tiles vertically and horizontally of the rook's position", () => {
      const rook = new Rook({ row: 3, col: 4 });

      expect(rook.getValidTileIndexes().length).toBe(14);
    });
  });
});
