import { describe, it, expect } from '@jest/globals';
import { act, renderHook, waitFor } from '@testing-library/react';

import useTextScroller from './useTextScroller';
import TextScrollerMockData from './text-scroller-mock-data';

jest.useFakeTimers();
jest.spyOn(global, 'setInterval');

describe('useTextScroller', () => {
  it('should be an array of empty strings on first tick', () => {
    const { result } = renderHook(() =>
      useTextScroller({
        text: TextScrollerMockData.plainText,
        screenWidth: TextScrollerMockData.screenWidth,
        tickInterval: TextScrollerMockData.tickInterval,
      })
    );

    expect(result.current.onScreen).toStrictEqual(
      TextScrollerMockData.emptyScroller
    );
  });

  it('should set the last element to be the first letter of text after first tick', async () => {
    const { result } = renderHook(() =>
      useTextScroller({
        text: TextScrollerMockData.plainText,
        screenWidth: TextScrollerMockData.screenWidth,
        tickInterval: TextScrollerMockData.tickInterval,
      })
    );

    act(() => jest.advanceTimersByTime(TextScrollerMockData.tickInterval));

    await waitFor(() => {
      expect(result.current.onScreen).toStrictEqual(
        TextScrollerMockData.scrollOnce
      );
    });
  });

  it('should be show ten letters on screen after ten ticks', async () => {
    const { result } = renderHook(() =>
      useTextScroller({
        text: TextScrollerMockData.plainText,
        screenWidth: TextScrollerMockData.screenWidth,
        tickInterval: TextScrollerMockData.tickInterval,
      })
    );

    act(() => jest.advanceTimersByTime(TextScrollerMockData.tickInterval * 10));

    await waitFor(() => {
      expect(result.current.onScreen).toStrictEqual(
        TextScrollerMockData.scrollTenTimes
      );
    });
  });

  it('should begin cutting off letters after the text has passed the screen width', async () => {
    const { result } = renderHook(() =>
      useTextScroller({
        text: TextScrollerMockData.plainText,
        screenWidth: TextScrollerMockData.screenWidth,
        tickInterval: TextScrollerMockData.tickInterval,
      })
    );

    act(() => jest.advanceTimersByTime(TextScrollerMockData.tickInterval * 21));

    await waitFor(() => {
      expect(result.current.onScreen).toStrictEqual(
        TextScrollerMockData.scrollTwentyOneTimes
      );
    });
  });

  it('should show an empty screen once the whole word has been cycled through', async () => {
    const { result } = renderHook(() =>
      useTextScroller({
        text: TextScrollerMockData.plainText,
        screenWidth: TextScrollerMockData.screenWidth,
        tickInterval: TextScrollerMockData.tickInterval,
      })
    );

    act(() =>
      jest.advanceTimersByTime(
        TextScrollerMockData.tickInterval *
          (TextScrollerMockData.plainText.length +
            TextScrollerMockData.screenWidth)
      )
    );

    await waitFor(() => {
      expect(result.current.onScreen).toStrictEqual(
        TextScrollerMockData.emptyScroller
      );
    });
  });

  // it('should support bold text', async () => {
  //   const { result } = renderHook(() =>
  //     useTextScroller({
  //       text: TextScrollerMockData.someBoldText,
  //       screenWidth: TextScrollerMockData.screenWidth,
  //       tickInterval: TextScrollerMockData.tickInterval,
  //     })
  //   );

  //   act(() => jest.advanceTimersByTime(TextScrollerMockData.tickInterval * 10));

  //   await waitFor(() => {
  //     expect(result.current.onScreen).toStrictEqual(
  //       TextScrollerMockData.emptyScroller
  //     );
  //   });
  // });
});
