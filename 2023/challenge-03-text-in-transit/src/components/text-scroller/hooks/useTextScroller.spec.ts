import { describe, it, expect } from '@jest/globals';
import { act, renderHook, waitFor } from '@testing-library/react';

import useTextScroller from './useTextScroller';
import TestScrollerMockData from './text-scroller-mock-data';

jest.useFakeTimers();
jest.spyOn(global, 'setInterval');

const TICK_INTERVAL = 250;

describe('useTextScroller', () => {
  describe('start()', () => {
    it('should be empty before the first tick', () => {
      const { result } = renderHook(() =>
        useTextScroller({
          text: 'the quick brown fox jumps over the lazy dog',
          screenWidth: 20,
          tickInterval: TICK_INTERVAL,
        })
      );

      expect(result.current.scrollerTextArray).toStrictEqual(
        TestScrollerMockData.emptyScroller
      );
    });
  });
});
