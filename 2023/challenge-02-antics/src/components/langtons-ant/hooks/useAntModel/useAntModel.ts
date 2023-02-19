import { useEffect, useRef, useState } from 'react';
import Ant from './ant';
import { Colour, PlayState } from './enums/enums';
import Grid from './grid/grid';
import { AntData } from './types';

type AntModel = {
  antData: AntData;
  gridData: Colour[][];
  start: () => void;
  stop: () => void;
};

const useAntModel = (ant: Ant, grid: Grid): AntModel => {
  const [playState, setPlayState] = useState<PlayState>(PlayState.Stop);
  const tickIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const [antData, setAntData] = useState<AntData>(ant.getState());
  const [gridData, setGridData] = useState<Colour[][]>(grid.getState());

  const start = () => {
    setPlayState(PlayState.Start);
  };

  useEffect(() => {
    if (playState === PlayState.Start) {
      tickIntervalRef.current = setInterval(() => {
        tick();
      }, 250);
    }
  }, [playState]);

  const tick = () => {
    ant.changeDirection(
      grid.getState()[antData.gridIndex.row][antData.gridIndex.col]
    );
    grid.invertAntCellColour(ant.getState().gridIndex);
    ant.move();

    setAntData({ ...ant.getState() });
    setGridData({ ...grid.getState() });
  };

  return { antData, gridData, start, stop };
};

export default useAntModel;
