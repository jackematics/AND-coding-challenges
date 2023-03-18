import useTextScroller from './hooks/useTextScroller';
import parse from 'html-react-parser';

type TextScrollerProps = {
  text: string;
  screenWidth: number;
  tickIntervalMilliseconds: number;
};

const TextScroller = ({
  text,
  screenWidth,
  tickIntervalMilliseconds: tickInterval,
}: TextScrollerProps) => {
  const { onScreen } = useTextScroller({
    text,
    screenWidth,
    tickIntervalMilliseconds: tickInterval,
  });

  return (
    <>
      <p className="text-right">{parse(onScreen)}</p>
    </>
  );
};

export default TextScroller;
