import { useEffect, useRef, useState } from 'react';
import { copy } from 'copy-anything';

import { PlayState } from './enums/enums';
import { AntGridData } from './types';
import AntGridModeller from './ant-grid/ant-grid';

type AntModel = {
  antGridData: AntGridData;
  playState: PlayState;
  start: () => void;
  stop: () => void;
  reset(): void;
};

const useAntModel = (antGridModeller: AntGridModeller): AntModel => {
  const tickIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const [playState, setPlayState] = useState<PlayState>(PlayState.Stop);
  const [antGridData, setAntGridData] = useState<AntGridData>(
    antGridModeller.getState()
  );

  const start = () => {
    setPlayState(PlayState.Start);
  };

  const stop = () => {
    clearInterval(tickIntervalRef.current as NodeJS.Timeout);
  };

  const reset = () => {
    antGridModeller.reset();
    setAntGridData(antGridModeller.getState());
  };

  useEffect(() => {
    if (playState === PlayState.Start) {
      tickIntervalRef.current = setInterval(() => {
        tick();
      }, 250);
    }
  }, [playState]);

  const tick = () => {
    antGridModeller.tick();
    setAntGridData(copy(antGridModeller.getState()));
  };

  return { antGridData, playState, start, stop, reset };
};

export default useAntModel;
