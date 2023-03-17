import { describe, it, expect } from '@jest/globals';
import { act, renderHook, waitFor } from '@testing-library/react';

import useTextScroller from './useTextScroller';
import TestScrollerMockData from './text-scroller-mock-data';

jest.useFakeTimers();
jest.spyOn(global, 'setInterval');

const TICK_INTERVAL = 250;

describe('useTextScroller', () => {
  it('should be an array of empty strings before the first tick', () => {
    const { result } = renderHook(() =>
      useTextScroller({
        text: 'The quick brown fox jumps over the lazy dog',
        screenWidth: 20,
        tickInterval: TICK_INTERVAL,
      })
    );

    expect(result.current.onScreen).toStrictEqual(
      TestScrollerMockData.emptyScroller
    );
  });

  describe('start()', () => {
    it('should be show one letter on screen after the first tick', async () => {
      const { result } = renderHook(() =>
        useTextScroller({
          text: 'The quick brown fox jumps over the lazy dog',
          screenWidth: 20,
          tickInterval: TICK_INTERVAL,
        })
      );

      act(() => result.current.start());
      act(() => jest.advanceTimersByTime(TICK_INTERVAL));
      act(() => result.current.stop());

      await waitFor(() => {
        expect(result.current.onScreen).toStrictEqual(
          TestScrollerMockData.scrollOnce
        );
      });
    });
  });
});
