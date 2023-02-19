import { Colour } from '../enums/enums';
import { GridIndex } from '../types';

export default class Grid {
  private readonly grid: Colour[][];

  constructor(grid: Colour[][]) {
    this.grid = grid;
  }

  public getState(): Colour[][] {
    return this.grid;
  }

  public invertAntCellColour(index: GridIndex): void {
    const squareColour = this.grid[index.row][index.col];
    this.grid[index.row][index.col] =
      squareColour === Colour.White ? Colour.Black : Colour.White;
  }

  public expandTop() {
    const whiteTopRow = Array.from(
      { length: this.grid[0].length },
      (_) => Colour.White
    );
    this.grid.splice(0, 0, whiteTopRow);
  }
}
