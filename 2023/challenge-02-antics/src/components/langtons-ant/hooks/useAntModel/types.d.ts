export type GridIndex = {
  row: number;
  col: number;
};

export type Rotation = 0 | 90 | 180 | 270;

export type AntData = {
  gridIndex: GridIndex;
  rotation: Rotation;
};
