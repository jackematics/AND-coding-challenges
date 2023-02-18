import { Colour } from './enums/enums';

export default class AntModelTestData {
  public static readonly antInitialGridIndex = { row: 1, col: 1 };
  public static readonly initialGridWhiteCentre = [
    [Colour.White, Colour.White, Colour.White],
    [Colour.White, Colour.White, Colour.White],
    [Colour.White, Colour.White, Colour.White],
  ];
  public static readonly initialGridBlackCentre = [
    [Colour.White, Colour.White, Colour.White],
    [Colour.White, Colour.Black, Colour.White],
    [Colour.White, Colour.White, Colour.White],
  ];
}
