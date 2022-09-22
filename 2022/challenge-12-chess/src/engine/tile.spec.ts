import Tile from './tile';

describe('Tile', () => {
  describe('getName()', () => {
    it('should get the name of the tile', () => {
      const tile = new Tile({ row: 3, col: 5 });

      expect(tile.getName()).toBe('F5');
    });
  });
});
