export default class CartesianOperations {
  public static directOneDimLineLongerThanIndirect(
    pointA: number,
    pointB: number,
    dimMax: number
  ): boolean {
    const directLine = Math.abs(pointA - pointB);
    const indirectLine = pointA + (dimMax - pointB);

    return directLine > indirectLine;
  }

  public static calculateYIntercept(
    pointA: MapCoordinates,
    pointB: MapCoordinates
  ): number | undefined {
    const gradient = this.calculateGradient(pointA, pointB);

    if (!gradient || gradient === 0) return undefined;

    return pointA.y - gradient * pointA.x;
  }

  public static calculateXIntercept(
    pointA: MapCoordinates,
    pointB: MapCoordinates
  ): number | undefined {
    const yIntercept = this.calculateYIntercept(pointA, pointB);
    const gradient = this.calculateGradient(pointA, pointB);

    if (!gradient || gradient === 0) return undefined;
    if (!yIntercept) return undefined;

    return -yIntercept / gradient;
  }

  private static calculateGradient(
    pointA: MapCoordinates,
    pointB: MapCoordinates
  ): number | undefined {
    if (pointB.x - pointA.x === 0) return undefined;

    return (pointB.y - pointA.y) / (pointB.x - pointA.x);
  }

  public static calculateAdjustedOneDimCoord(
    to: number,
    from: number,
    dimMax: number
  ): number {
    return to < from ? from - dimMax : from + dimMax;
  }

  public static calculateLineLength(
    pointA: MapCoordinates,
    pointB: MapCoordinates
  ): number {
    return Math.sqrt(
      Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2)
    );
  }
}
