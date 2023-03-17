import { useEffect, useRef, useState } from 'react';

import TextScrollerOperations from '../text-scroller-operations';

type TextScrollerProps = {
  text: string;
  screenWidth: number;
  tickInterval: number;
};

type TextScrollerResult = {
  onScreen: string;
};

const useTextScroller = ({
  text,
  screenWidth,
  tickInterval,
}: TextScrollerProps): TextScrollerResult => {
  const offScreenRef = useRef<string[]>(
    TextScrollerOperations.initialiseOffScreenText(text)
  );

  const onScreenRef = useRef<string[]>(Array(screenWidth).fill(' '));
  const [tickIntervalCount, setTickIntervalCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      tick();
      setTickIntervalCount(tickIntervalCount + 1);
    }, tickInterval);
    return () => clearInterval(interval);
  }, [tickIntervalCount]);

  const tick = () => {
    const nextOnScreen = TextScrollerOperations.scrollLeft(
      onScreenRef.current,
      offScreenRef.current
    );

    const nextOffScreen = TextScrollerOperations.scrollLeft(
      offScreenRef.current,
      onScreenRef.current
    );

    onScreenRef.current = nextOnScreen;
    offScreenRef.current = nextOffScreen;
  };

  return { onScreen: onScreenRef.current.join('') };
};

export default useTextScroller;
