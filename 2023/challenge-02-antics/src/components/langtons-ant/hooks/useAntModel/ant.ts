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
    const nextIndexClockwise = (rotations.indexOf(this.rotation) + 1) % 4;
    const nextIndexAntiClockwise =
      (rotations.indexOf(this.rotation) - 1 + 4) % 4;

    this.rotation =
      currentTileColour === Colour.White
        ? rotations[nextIndexAntiClockwise]
        : rotations[nextIndexClockwise];
  }

  public move(): void {
    switch (this.rotation) {
      case 0:
        this.gridIndex.row--;
        break;

      case 90:
        this.gridIndex.col++;
        break;

      case 180:
        this.gridIndex.row++;
        break;

      case 270:
        this.gridIndex.col--;
        break;

      default:
        throw new Error('invalid rotation');
    }
  }
}
