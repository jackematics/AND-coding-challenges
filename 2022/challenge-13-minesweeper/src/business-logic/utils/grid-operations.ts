import GridIndex from '../../types/grid-index';
import Tile from '../tile';

export default class GridOperations {
  public static indexOutOfBounds(
    gridIndex: GridIndex,
    grid: Tile[][]
  ): boolean {
    return (
      gridIndex.row < 0 ||
      gridIndex.row > grid.length - 1 ||
      gridIndex.col < 0 ||
      gridIndex.col > grid[0].length - 1
    );
  }

  public static tilesHaveSameIndex(a: GridIndex, b: GridIndex): boolean {
    return a.row === b.row && a.col === b.col;
  }
}
