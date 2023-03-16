type TextScrollerProps = {
  text: string;
  screenWidth: number;
  tickInterval: number;
};

type TextScrollerResult = {
  scrollerTextArray: string[];
};

const useTextScroller = ({
  text,
  screenWidth,
  tickInterval,
}: TextScrollerProps): TextScrollerResult => {
  return { scrollerTextArray: Array(screenWidth).fill('') };
};

export default useTextScroller;
