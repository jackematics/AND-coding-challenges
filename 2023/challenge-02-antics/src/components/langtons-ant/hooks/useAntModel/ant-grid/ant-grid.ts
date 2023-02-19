import { AntGridData } from '../types';
import Ant from './ant';
import Grid from './grid';

export default class AntGrid {
  private readonly ant: Ant;
  private readonly grid: Grid;

  public constructor(ant: Ant, grid: Grid) {
    this.ant = ant;
    this.grid = grid;
  }

  public tick() {
    this.ant.changeDirection(
      this.grid.getColourAtIndex(this.ant.getState().gridIndex)
    );
    this.grid.invertAntCellColour(this.ant.getState().gridIndex);
    this.grid.expandIfAntPassingBoundary(this.ant);
    this.ant.move();
  }

  public getState(): AntGridData {
    return {
      antData: this.ant.getState(),
      gridData: this.grid.getState(),
    };
  }
}
