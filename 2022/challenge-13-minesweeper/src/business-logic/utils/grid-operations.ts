import Bounds from '../../types/bounds';
import GridIndex from '../../types/grid-index';

export default class GridOperations {
  public static indexOutOfBounds(
    gridIndex: GridIndex,
    rowBounds: Bounds,
    colBounds: Bounds
  ): boolean {
    return (
      gridIndex.row < rowBounds.lower ||
      gridIndex.row > rowBounds.upper ||
      gridIndex.col < colBounds.lower ||
      gridIndex.col > colBounds.upper
    );
  }
}
