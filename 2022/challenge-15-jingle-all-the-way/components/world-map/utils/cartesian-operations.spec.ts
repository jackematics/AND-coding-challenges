import CartesianOperations from './cartesian-operations';

describe('CartesianOperations', () => {
  describe('directLineShorter()', () => {
    it('should check if a line directly between two 1D points is longer than indirect example 1', () => {
      expect(
        CartesianOperations.directOneDimLineLongerThanIndirect(2, 3, 4)
      ).toBe(false);
    });

    it('shoushould check if a line directly between two 1D points is longer than indirect example 2', () => {
      expect(
        CartesianOperations.directOneDimLineLongerThanIndirect(4, 1388, 1408)
      ).toBe(true);
    });

    it('should check if a line directly between two 1D points is longer than indirect example 3', () => {
      expect(
        CartesianOperations.directOneDimLineLongerThanIndirect(704, 415, 1408)
      ).toBe(false);
    });
  });

  describe('calculateYIntercept()', () => {
    it('should calculate the y intercept of two points', () => {
      const pointA = { x: 4, y: 93 };
      const pointB = { x: -30, y: 498 };
      expect(CartesianOperations.calculateYIntercept(pointA, pointB)).toBe(
        93 - 4 * (405 / -34) // calculated by hand
      );
    });
  });

  describe('calculateXIntercept()', () => {
    it('should calculate the x intercept of two points separated by a border', () => {
      const pointA = { x: 4, y: 93 };
      const pointB = { x: -30, y: 498 };
      expect(CartesianOperations.calculateXIntercept(pointA, pointB)).toBe(
        -(93 - 4 * (405 / -34)) / (405 / -34) // calculated by hand
      );
    });
  });

  describe('calculateAdjustedOneDimCoord()', () => {
    it('should calculate the adjusted 1D coord value for an indirect line example 1', () => {
      const fromX = 4;
      const toX = 1388;
      const dimMax = 1408;
      expect(
        CartesianOperations.calculateAdjustedOneDimCoord(fromX, toX, dimMax)
      ).toBe(-20);
    });

    it('should calculate the adjusted 1D coord value for an indirect line example 2', () => {
      const from = 1388;
      const to = 4;
      const dimMax = 1408;
      expect(
        CartesianOperations.calculateAdjustedOneDimCoord(from, to, dimMax)
      ).toBe(1412);
    });
  });

  describe('lineLength()', () => {
    it('should calculate the length of a line between two points', () => {
      const pointA = { x: 4, y: 93 };
      const pointB = { x: 1388, y: 499 };
      expect(CartesianOperations.calculateLineLength(pointA, pointB)).toBe(
        2 * Math.sqrt(520073)
      );
    });
  });
});
