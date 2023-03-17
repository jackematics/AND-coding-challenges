import { useEffect, useRef, useState } from 'react';
import { ScrollState } from '../enums/text-scroller-enums';
import { copy } from 'copy-anything';

import TextScrollerInitialiser from '../text-scroller-initialiser';

type TextScrollerProps = {
  text: string;
  screenWidth: number;
  tickInterval: number;
};

type TextScrollerResult = {
  onScreen: string[];
  start: () => void;
  stop: () => void;
};

const useTextScroller = ({
  text,
  screenWidth,
  tickInterval,
}: TextScrollerProps): TextScrollerResult => {
  const tickIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const [scrollState, setScrollState] = useState<ScrollState>(ScrollState.Stop);
  const [offScreen, setOffScreen] = useState<string[]>(
    TextScrollerInitialiser.initialiseOffScreenText(text)
  );
  const [onScreen, setOnScreen] = useState<string[]>(
    Array(screenWidth).fill('')
  );

  const start = () => {
    setScrollState(ScrollState.Start);
  };

  const stop = () => {
    clearInterval(tickIntervalRef.current as NodeJS.Timeout);
    setScrollState(ScrollState.Stop);
  };

  useEffect(() => {
    if (scrollState === ScrollState.Start) {
      tickIntervalRef.current = setInterval(() => {
        tick();
      }, tickInterval);
    }
  }, [scrollState]);

  const tick = () => {
    const nextOnScreen = onScreen.slice(1).concat([offScreen[0]]);
    const nextOffScreen = offScreen
      .slice(1)
      .concat([onScreen[onScreen.length - 1]]);

    setOnScreen(nextOnScreen);
    setOffScreen(nextOffScreen);
  };

  return { start, stop, onScreen };
};

export default useTextScroller;
