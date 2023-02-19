import { Colour } from './enums/enums';
import { AntData, GridIndex, Rotation } from './types';

const rotations: Rotation[] = [0, 90, 180, 270];

export default class Ant {
  private gridIndex: GridIndex;
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

  public adjustToBoundaryExpansion(adjustmentAmount: GridIndex) {
    this.gridIndex.row += adjustmentAmount.row;
    this.gridIndex.col += adjustmentAmount.col;
  }

  public move(): void {
    this.gridIndex = {
      0: { ...this.gridIndex, row: this.gridIndex.row - 1 },
      90: { ...this.gridIndex, col: this.gridIndex.col + 1 },
      180: { ...this.gridIndex, row: this.gridIndex.row + 1 },
      270: { ...this.gridIndex, col: this.gridIndex.col - 1 },
    }[this.rotation];
  }
}
