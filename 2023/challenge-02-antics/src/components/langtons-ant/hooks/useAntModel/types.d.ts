import { Colour } from './enums/enums';

export type GridIndex = {
  row: number;
  col: number;
};

export type Rotation = 0 | 90 | 180 | 270;

type AntData = {
  gridIndex: GridIndex;
  rotation: Rotation;
};

export type AntGridData = {
  antData: AntData;
  gridData: Colour[][];
};
