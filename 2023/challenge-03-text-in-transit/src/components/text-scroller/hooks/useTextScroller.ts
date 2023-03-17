import { useEffect, useRef, useState } from 'react';
import ScrollCharacter from '../scroll-character';

import TextScrollerOperations from '../utils/text-scroller-operations';

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
  const onScreenRef = useRef<ScrollCharacter[]>(
    Array(screenWidth).fill(new ScrollCharacter(' '))
  );
  const offScreenRef = useRef<ScrollCharacter[]>(
    TextScrollerOperations.initialiseScrollCharacters(text)
  );

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

  return {
    onScreen: TextScrollerOperations.convertToString(onScreenRef.current),
  };
};

export default useTextScroller;
