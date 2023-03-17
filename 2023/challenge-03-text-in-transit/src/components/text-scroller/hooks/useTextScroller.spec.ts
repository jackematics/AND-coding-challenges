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

  it('should set the last element to be the first letter of text after first tick', () => {
    const { result } = renderHook(() =>
      useTextScroller({
        text: TextScrollerMockData.plainText,
        screenWidth: TextScrollerMockData.screenWidth,
        tickInterval: TextScrollerMockData.tickInterval,
      })
    );

    act(() => jest.advanceTimersByTime(TextScrollerMockData.tickInterval));

    expect(result.current.onScreen).toStrictEqual(
      TextScrollerMockData.scrollOncePlain
    );
  });

  it('should be show ten letters on screen after ten ticks', () => {
    const { result } = renderHook(() =>
      useTextScroller({
        text: TextScrollerMockData.plainText,
        screenWidth: TextScrollerMockData.screenWidth,
        tickInterval: TextScrollerMockData.tickInterval,
      })
    );

    act(() => jest.advanceTimersByTime(TextScrollerMockData.tickInterval * 10));

    expect(result.current.onScreen).toStrictEqual(
      TextScrollerMockData.scrollTenTimesPlain
    );
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

    expect(result.current.onScreen).toStrictEqual(
      TextScrollerMockData.scrollTwentyOneTimesPlain
    );
  });

  it('should show an empty screen once the whole word has been cycled through', () => {
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

    expect(result.current.onScreen).toStrictEqual(
      TextScrollerMockData.emptyScroller
    );
  });

  it('should support bold text', () => {
    const { result } = renderHook(() =>
      useTextScroller({
        text: TextScrollerMockData.someBoldText,
        screenWidth: TextScrollerMockData.screenWidth,
        tickInterval: TextScrollerMockData.tickInterval,
      })
    );

    act(() => jest.advanceTimersByTime(TextScrollerMockData.tickInterval * 10));

    expect(result.current.onScreen).toStrictEqual(
      TextScrollerMockData.scrollTenTimesBold
    );
  });

  it('should support underlined text', () => {
    const { result } = renderHook(() =>
      useTextScroller({
        text: TextScrollerMockData.someUnderlinedText,
        screenWidth: TextScrollerMockData.screenWidth,
        tickInterval: TextScrollerMockData.tickInterval,
      })
    );

    act(() => jest.advanceTimersByTime(TextScrollerMockData.tickInterval * 10));

    expect(result.current.onScreen).toStrictEqual(
      TextScrollerMockData.scrollTenTimesUnderlined
    );
  });

  it('should support bold and underlined text', () => {
    const { result } = renderHook(() =>
      useTextScroller({
        text: TextScrollerMockData.someBoldAndUnderlinedText,
        screenWidth: TextScrollerMockData.screenWidth,
        tickInterval: TextScrollerMockData.tickInterval,
      })
    );

    act(() => jest.advanceTimersByTime(TextScrollerMockData.tickInterval * 10));

    expect(result.current.onScreen).toStrictEqual(
      TextScrollerMockData.scrollTenTimesBoldAndUnderlined
    );
  });

  it('should support coloured text', () => {
    const { result } = renderHook(() =>
      useTextScroller({
        text: TextScrollerMockData.someColouredText,
        screenWidth: TextScrollerMockData.screenWidth,
        tickInterval: TextScrollerMockData.tickInterval,
      })
    );

    act(() => jest.advanceTimersByTime(TextScrollerMockData.tickInterval * 10));

    expect(result.current.onScreen).toStrictEqual(
      TextScrollerMockData.scrollTenTimesColoured
    );
  });

  it('should support bold, underlined and coloured text', () => {
    const { result } = renderHook(() =>
      useTextScroller({
        text: TextScrollerMockData.someBoldColouredAndUnderlinedText,
        screenWidth: TextScrollerMockData.screenWidth,
        tickInterval: TextScrollerMockData.tickInterval,
      })
    );

    act(() => jest.advanceTimersByTime(TextScrollerMockData.tickInterval * 10));

    expect(result.current.onScreen).toStrictEqual(
      TextScrollerMockData.scrollTenTimesBoldUnderlinedAndColoured
    );
  });

  it('should support nested colours', () => {
    const { result } = renderHook(() =>
      useTextScroller({
        text: TextScrollerMockData.someBoldNestedColouredAndUnderlinedText,
        screenWidth: TextScrollerMockData.screenWidth,
        tickInterval: TextScrollerMockData.tickInterval,
      })
    );

    act(() => jest.advanceTimersByTime(TextScrollerMockData.tickInterval * 10));

    expect(result.current.onScreen).toStrictEqual(
      TextScrollerMockData.scrollTenTimesBoldUnderlinedAndNestedColoured
    );
  });
});
