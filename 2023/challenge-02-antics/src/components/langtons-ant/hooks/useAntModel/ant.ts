import { Colour } from './enums/enums';
import { AntData, GridIndex, Rotation } from './types';

const rotations: Rotation[] = [0, 90, 180, 270];

export default class Ant {
  private readonly gridIndex: GridIndex;
  private rotation: Rotation;

  constructor(gridIndex: GridIndex, rotation: Rotation) {
    this.gridIndex = gridIndex;
    this.rotation = rotation;
  }

  public getState(): AntData {
    return {
      gridIndex: this.gridIndex,
      rotation: this.rotation,
    };
  }

  public changeDirection(currentTileColour: Colour) {
    const nextIndexAntiClockwise =
      (rotations.indexOf(this.rotation) - 1 + 4) % 4;
    this.rotation = rotations[nextIndexAntiClockwise];
  }
}
