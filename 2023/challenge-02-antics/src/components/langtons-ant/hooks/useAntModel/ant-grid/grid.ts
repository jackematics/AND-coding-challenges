import Ant from './ant';
import { Colour } from '../enums/enums';
import { AntData, GridIndex } from '../types';

export default class Grid {
  private grid: Colour[][];

  constructor(grid: Colour[][]) {
    this.grid = grid;
  }

  public getState(): Colour[][] {
    return this.grid;
  }

  public getColourAtIndex(gridIndex: GridIndex): Colour {
    return this.grid[gridIndex.row][gridIndex.col];
  }

  public invertAntCellColour(index: GridIndex): void {
    const squareColour = this.grid[index.row][index.col];
    this.grid[index.row][index.col] =
      squareColour === Colour.White ? Colour.Black : Colour.White;
  }

  public expandIfAntPassingBoundary(ant: Ant) {
    if (ant.getState().rotation === 0 && ant.getState().gridIndex.row === 0) {
      this.expandTop();
      ant.adjustToBoundaryExpansion({ row: +1, col: 0 });
    }

    if (
      ant.getState().rotation === 90 &&
      ant.getState().gridIndex.col === this.grid[0].length - 1
    ) {
      this.expandRight();
    }
  }

  private expandTop() {
    const whiteTopRow = Array.from(
      { length: this.grid[0].length },
      (_) => Colour.White
    );
    this.grid.splice(0, 0, whiteTopRow);
  }

  private expandRight() {
    this.grid = this.grid.map((row) => [...row, Colour.White]);
  }
}
