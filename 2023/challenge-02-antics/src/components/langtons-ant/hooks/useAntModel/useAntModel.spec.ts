import { act, renderHook, waitFor } from '@testing-library/react';
import { Colour } from './enums/enums';
import useAntModel from '../useAntModel/useAntModel';
import Ant from './ant';
import Grid from './grid/grid';
import AntModelTestData from './ant-model-test-data';

jest.useFakeTimers();
jest.spyOn(global, 'setInterval');

describe('useAntModel', () => {
  describe('start()', () => {
    describe('when ant cell is initially white', () => {
      it('should turn the ant current cell black', async () => {
        const { result } = renderHook(() =>
          useAntModel(
            new Ant({ ...AntModelTestData.antInitialGridIndex }, 0),
            new Grid({ ...AntModelTestData.initialGridWhiteCentre })
          )
        );

        act(() => result.current.start());
        act(() => jest.advanceTimersByTime(250));

        await waitFor(() => {
          expect(
            result.current.gridData[AntModelTestData.antInitialGridIndex.row][
              AntModelTestData.antInitialGridIndex.col
            ]
          ).toBe(Colour.Black);
        });
      });

      it('should set the ant to face left', async () => {
        const { result } = renderHook(() =>
          useAntModel(
            new Ant({ ...AntModelTestData.antInitialGridIndex }, 0),
            new Grid({ ...AntModelTestData.initialGridWhiteCentre })
          )
        );

        act(() => result.current.start());
        act(() => jest.advanceTimersByTime(250));

        await waitFor(() => {
          expect(result.current.antData.rotation).toBe(270);
        });
      });
    });

    describe('when the ant cell is initially black', () => {
      it('should turn the ant current cell white', async () => {
        const { result } = renderHook(() =>
          useAntModel(
            new Ant({ ...AntModelTestData.antInitialGridIndex }, 0),
            new Grid({ ...AntModelTestData.initialGridBlackCentre })
          )
        );

        act(() => result.current.start());
        act(() => jest.advanceTimersByTime(250));

        await waitFor(() => {
          expect(
            result.current.gridData[AntModelTestData.antInitialGridIndex.row][
              AntModelTestData.antInitialGridIndex.col
            ]
          ).toBe(Colour.White);
        });
      });

      it('should set the ant to face right', async () => {
        const { result } = renderHook(() =>
          useAntModel(
            new Ant({ ...AntModelTestData.antInitialGridIndex }, 0),
            new Grid({ ...AntModelTestData.initialGridBlackCentre })
          )
        );

        act(() => result.current.start());
        act(() => jest.advanceTimersByTime(250));

        await waitFor(() => {
          expect(result.current.antData.rotation).toBe(90);
        });
      });
    });
  });
});
