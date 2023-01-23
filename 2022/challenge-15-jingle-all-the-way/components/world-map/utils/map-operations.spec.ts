import MapOperations from './map-operations';

describe('MapOperations', () => {
  describe('calculateClosestPoint()', () => {
    it('Given the world is round, should return the closest point to another (example 1)', () => {
      const dimMaxes = { width: 10, height: 10 };
      const from = { x: 5, y: 5 };
      const to = { x: 7, y: 7 };
      expect(
        MapOperations.calculateClosestPoint(from, to, dimMaxes)
      ).toStrictEqual(to);
    });

    it('Given the world is round, should return the closest point to another (example 2)', () => {
      const dimMaxes = { width: 10, height: 10 };
      const from = { x: 3, y: 3 };
      const to = { x: 9, y: 9 };
      expect(
        MapOperations.calculateClosestPoint(from, to, dimMaxes)
      ).toStrictEqual({ x: -1, y: -1 });
    });

    it('Given the world is round, should return the closest point to another (example 3)', () => {
      const dimMaxes = { width: 10, height: 10 };
      const from = { x: 3, y: 7 };
      const to = { x: 9, y: 9 };

      expect(
        MapOperations.calculateClosestPoint(from, to, dimMaxes)
      ).toStrictEqual({ x: -1, y: 9 });
    });
  });

  describe('calculateDrawingPoints()', () => {
    it('Given the world is round, should return the closest point to another (example 1)', () => {
      const dimMaxes = { width: 10, height: 10 };
      const from = { x: 4, y: 4 };
      const to = { x: -2, y: -5 };
      expect(
        MapOperations.calculateDrawingPoints(from, to, dimMaxes)
      ).toStrictEqual([
        { from, to: { x: 4 / 3, y: 0 } },
        {
          from: { x: 4 / 3, y: dimMaxes.height },
          to: { x: 0, y: -2 + dimMaxes.height },
        },
        {
          from: { x: dimMaxes.width, y: -2 + dimMaxes.height },
          to,
        },
      ]);
    });

    it('Given the world is round, should return the closest point to another (example 2)', () => {
      const dimMaxes = { width: 12, height: 12 };
      const from = { x: 10, y: 10 };
      const to = { x: 2, y: 2 };
      expect(
        MapOperations.calculateDrawingPoints(from, to, dimMaxes)
      ).toStrictEqual([
        { from, to: { x: 4 / 3, y: 0 } },
        {
          from: { x: 4 / 3, y: dimMaxes.height },
          to: { x: 0, y: -2 + dimMaxes.height },
        },
        {
          from: { x: dimMaxes.width, y: -2 + dimMaxes.height },
          to,
        },
      ]);
    });
  });
});
