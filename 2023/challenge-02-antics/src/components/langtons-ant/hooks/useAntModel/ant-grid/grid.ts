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

  public expandTop() {
    this.grid.splice(0, 0, this.createWhiteRow());
  }

  public expandRight() {
    this.grid = this.grid.map((row) => [...row, Colour.White]);
  }

  public expandBottom() {
    this.grid.push(this.createWhiteRow());
  }

  private createWhiteRow() {
    return Array.from({ length: this.grid[0].length }, (_) => Colour.White);
  }
}
