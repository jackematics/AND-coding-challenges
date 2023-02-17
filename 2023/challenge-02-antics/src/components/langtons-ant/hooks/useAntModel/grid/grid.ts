import { Colour } from '../enums/enums';
import { GridIndex } from '../types';

type GridDims = {
  width: number;
  height: number;
};

export default class Grid {
  private readonly grid: Colour[][];

  constructor(gridDims: GridDims) {
    this.grid = Array.from({ length: gridDims.height }, (_) =>
      Array.from({ length: gridDims.width }, (_) => Colour.White)
    );
  }

  public getState(): Colour[][] {
    return this.grid;
  }

  public flipAntSquare(index: GridIndex): void {
    const squareColour = this.grid[index.row][index.col];
    this.grid[index.row][index.col] =
      squareColour === Colour.White ? Colour.Black : Colour.White;
  }
}
