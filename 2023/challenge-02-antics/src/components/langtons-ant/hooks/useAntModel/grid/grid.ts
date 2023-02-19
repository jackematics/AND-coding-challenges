import { Colour } from '../enums/enums';
import { AntData, GridIndex } from '../types';

export default class Grid {
  private readonly grid: Colour[][];

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

  public expandIfAntPassingBoundary(antData: AntData) {
    if (antData.rotation === 0 && antData.gridIndex.row === 0) {
      this.expandTop();
    }
  }

  private expandTop() {
    const whiteTopRow = Array.from(
      { length: this.grid[0].length },
      (_) => Colour.White
    );
    this.grid.splice(0, 0, whiteTopRow);
  }
}
