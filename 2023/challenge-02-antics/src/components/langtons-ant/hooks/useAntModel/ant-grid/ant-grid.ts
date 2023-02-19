import { AntGridData } from '../types';
import Ant from './ant';
import Grid from './grid';

export default class AntGridModeller {
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
    this.expandGridIfAntPassingTop();
    this.expandGridIfAntPassingRight();
    this.expandGridIfAntPassingBottom();
  }

  private expandGridIfAntPassingTop() {
    if (
      this.ant.getState().rotation === 0 &&
      this.ant.getState().gridIndex.row === 0
    ) {
      this.grid.expandTop();
      this.ant.adjustToBoundaryExpansion({ row: +1, col: 0 });
    }
  }

  private expandGridIfAntPassingRight() {
    if (
      this.ant.getState().rotation === 90 &&
      this.ant.getState().gridIndex.col === this.grid.getState()[0].length - 1
    ) {
      this.grid.expandRight();
    }
  }

  private expandGridIfAntPassingBottom() {
    if (
      this.ant.getState().rotation === 180 &&
      this.ant.getState().gridIndex.row === this.grid.getState().length - 1
    ) {
      this.grid.expandBottom();
    }
  }

  public getState(): AntGridData {
    return {
      antData: this.ant.getState(),
      gridData: this.grid.getState(),
    };
  }
}
