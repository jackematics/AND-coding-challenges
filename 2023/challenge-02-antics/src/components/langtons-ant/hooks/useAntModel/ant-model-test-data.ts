import { Colour } from './enums/enums';

export default class AntModelTestData {
  public static readonly antInitialGridIndex = { row: 1, col: 1 };
  public static readonly antInitialRotation = 0;
  public static readonly initialGrid = [
    [Colour.White, Colour.White, Colour.White],
    [Colour.White, Colour.White, Colour.White],
    [Colour.White, Colour.White, Colour.White],
  ];
  public static readonly initialGridBlackCentre = [
    [Colour.White, Colour.White, Colour.White],
    [Colour.White, Colour.Black, Colour.White],
    [Colour.White, Colour.White, Colour.White],
  ];

  public static readonly antTopBoundaryGridIndex = { row: 0, col: 1 };
  public static readonly antTopBoundaryRotation = 90;
  public static readonly gridTopBoundaryAdded = [
    [Colour.White, Colour.White, Colour.White],
    [Colour.White, Colour.Black, Colour.White],
    [Colour.White, Colour.White, Colour.White],
    [Colour.White, Colour.White, Colour.White],
  ];

  public static readonly antRightBoundaryGridIndex = { row: 1, col: 2 };
  public static readonly antRightBoundaryRotation = 180;
  public static readonly gridRightBoundaryAdded = [
    [Colour.White, Colour.White, Colour.White, Colour.White],
    [Colour.White, Colour.White, Colour.Black, Colour.White],
    [Colour.White, Colour.White, Colour.White, Colour.White],
  ];
}
