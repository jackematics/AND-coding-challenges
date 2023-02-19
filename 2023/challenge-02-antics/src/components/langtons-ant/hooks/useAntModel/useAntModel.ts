import { useEffect, useRef, useState } from 'react';
import { copy } from 'copy-anything';

import { PlayState } from './enums/enums';
import { AntGridData } from './types';
import AntGridModeller from './ant-grid/ant-grid';

type AntModel = {
  antGridData: AntGridData;
  start: () => void;
  stop: () => void;
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

  return { antGridData, start, stop };
};

export default useAntModel;
