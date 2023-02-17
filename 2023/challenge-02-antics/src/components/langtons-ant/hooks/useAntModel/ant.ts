import { Direction } from './enums/enums';
import { AntData, GridIndex } from './types';

export default class Ant {
  private readonly gridIndex: GridIndex;
  private readonly direction: Direction;

  constructor(gridIndex: GridIndex, direction: Direction) {
    this.gridIndex = gridIndex;
    this.direction = direction;
  }

  public getState(): AntData {
    return {
      gridIndex: this.gridIndex,
      direction: this.direction,
    };
  }
}
