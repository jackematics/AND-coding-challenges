import { useEffect, useRef, useState } from 'react';
import { copy } from 'copy-anything';

import { Colour, PlayState } from './enums/enums';
import Ant from './ant';
import Grid from './grid/grid';
import { AntData } from './types';

type AntModel = {
  antData: AntData;
  gridData: Colour[][];
  start: () => void;
  stop: () => void;
};

const useAntModel = (ant: Ant, grid: Grid): AntModel => {
  const tickIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const [playState, setPlayState] = useState<PlayState>(PlayState.Stop);
  const [antData, setAntData] = useState<AntData>(ant.getState());
  const [gridData, setGridData] = useState<Colour[][]>(grid.getState());

  const start = () => {
    setPlayState(PlayState.Start);
  };

  const stop = () => {
    clearInterval(tickIntervalRef.current as NodeJS.Timeout);
  };

  useEffect(() => {
    if (playState === PlayState.Start) {
      tickIntervalRef.current = setInterval(() => {
        tick();
      }, 250);
    }
  }, [playState]);

  const tick = () => {
    ant.changeDirection(grid.getColourAtIndex(ant.getState().gridIndex));
    grid.invertAntCellColour(ant.getState().gridIndex);
    grid.expandIfAntPassingBoundary(ant.getState());
    ant.move();

    setAntData(copy(ant.getState()));
    setGridData(copy(grid.getState()));
  };

  return { antData, gridData, start, stop };
};

export default useAntModel;
