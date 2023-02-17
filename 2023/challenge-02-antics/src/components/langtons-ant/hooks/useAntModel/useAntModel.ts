import { useState } from 'react';
import Ant from './ant';
import { Colour } from './enums/enums';
import Grid from './grid/grid';
import { AntData } from './types';

type AntModel = {
  antData: AntData;
  gridData: Colour[][];
  tick: () => void;
};

const useAntModel = (ant: Ant, grid: Grid): AntModel => {
  const [antData, setAntData] = useState<AntData>(ant.getState());
  const [gridData, setGridData] = useState<Colour[][]>(grid.getState());

  const tick = () => {
    grid.flipAntSquare(ant.getState().gridIndex);
    setGridData({ ...grid.getState() });
  };

  return { antData, gridData, tick };
};

export default useAntModel;
