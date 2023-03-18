import useTextScroller from './hooks/useTextScroller';
import parse from 'html-react-parser';

type TextScrollerProps = {
  text: string;
  screenWidth: number;
  tickInterval: number;
};

const TextScroller = ({
  text,
  screenWidth,
  tickInterval,
}: TextScrollerProps) => {
  const { onScreen } = useTextScroller({
    text,
    screenWidth,
    tickInterval,
  });

  return (
    <>
      <p className="">{parse(onScreen)}</p>
    </>
  );
};

export default TextScroller;
