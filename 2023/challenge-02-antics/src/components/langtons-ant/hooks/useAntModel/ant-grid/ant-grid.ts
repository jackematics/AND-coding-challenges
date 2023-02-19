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
    this.expandGridIfAntPassingBoundary();
    this.ant.move();
  }

  private expandGridIfAntPassingBoundary() {
    if (
      this.ant.getState().rotation === 0 &&
      this.ant.getState().gridIndex.row === 0
    ) {
      this.grid.expandTop();
      this.ant.adjustToBoundaryExpansion({ row: +1, col: 0 });
    }

    if (
      this.ant.getState().rotation === 90 &&
      this.ant.getState().gridIndex.col === this.grid.getState()[0].length - 1
    ) {
      this.grid.expandRight();
    }
  }

  public getState(): AntGridData {
    return {
      antData: this.ant.getState(),
      gridData: this.grid.getState(),
    };
  }
}
