import { act, renderHook, waitFor } from '@testing-library/react';
import { Colour } from './enums/enums';
import useAntModel from '../useAntModel/useAntModel';
import Ant from './ant';
import Grid from './grid/grid';
import AntModelTestData from './ant-model-test-data';
import { copy } from 'copy-anything';

jest.useFakeTimers();
jest.spyOn(global, 'setInterval');
const tickTimeUnit = 250;

describe('useAntModel', () => {
  describe('stop()', () => {
    it('should stop the simulation', async () => {
      const { result } = renderHook(() =>
        useAntModel(
          new Ant(
            copy(AntModelTestData.antInitialGridIndex),
            AntModelTestData.antInitialRotation
          ),
          new Grid(copy(AntModelTestData.initialGrid))
        )
      );

      act(() => result.current.start());
      act(() => jest.advanceTimersByTime(tickTimeUnit));

      act(() => result.current.stop());
      act(() => jest.advanceTimersByTime(500));

      await waitFor(() => {
        expect(result.current.antData.gridIndex.row).toBe(1);
        expect(result.current.antData.gridIndex.col).toBe(0);
      });
    });
  });

  describe('start()', () => {
    describe('when ant cell is initially white', () => {
      it('should turn the ant current cell black', async () => {
        const { result } = renderHook(() =>
          useAntModel(
            new Ant(
              copy(AntModelTestData.antInitialGridIndex),
              AntModelTestData.antInitialRotation
            ),
            new Grid(copy(AntModelTestData.initialGrid))
          )
        );

        act(() => result.current.start());
        act(() => jest.advanceTimersByTime(tickTimeUnit));
        act(() => result.current.stop());

        await waitFor(() => {
          expect(
            result.current.gridData[AntModelTestData.antInitialGridIndex.row][
              AntModelTestData.antInitialGridIndex.col
            ]
          ).toBe(Colour.Black);
        });
      });

      it('should turn the ant 90 degrees anticlockwise', async () => {
        const { result } = renderHook(() =>
          useAntModel(
            new Ant(
              copy(AntModelTestData.antInitialGridIndex),
              AntModelTestData.antInitialRotation
            ),
            new Grid(copy(AntModelTestData.initialGrid))
          )
        );

        act(() => result.current.start());
        act(() => jest.advanceTimersByTime(tickTimeUnit));
        act(() => result.current.stop());

        await waitFor(() => {
          expect(result.current.antData.rotation).toBe(270);
        });
      });
    });

    describe('when the ant cell is initially black', () => {
      it('should turn the ant current cell white', async () => {
        const { result } = renderHook(() =>
          useAntModel(
            new Ant(
              copy(AntModelTestData.antInitialGridIndex),
              AntModelTestData.antInitialRotation
            ),
            new Grid(copy(AntModelTestData.initialGridBlackCentre))
          )
        );

        act(() => result.current.start());
        act(() => jest.advanceTimersByTime(tickTimeUnit));
        act(() => result.current.stop());

        await waitFor(() => {
          expect(
            result.current.gridData[AntModelTestData.antInitialGridIndex.row][
              AntModelTestData.antInitialGridIndex.col
            ]
          ).toBe(Colour.White);
        });
      });

      it('should turn the ant 90 degrees clockwise', async () => {
        const { result } = renderHook(() =>
          useAntModel(
            new Ant(
              copy(AntModelTestData.antInitialGridIndex),
              AntModelTestData.antInitialRotation
            ),
            new Grid(copy(AntModelTestData.initialGridBlackCentre))
          )
        );

        act(() => result.current.start());
        act(() => jest.advanceTimersByTime(tickTimeUnit));
        act(() => result.current.stop());

        await waitFor(() => {
          expect(result.current.antData.rotation).toBe(90);
        });
      });
    });

    it('should move the ant one cell in the rotated direction', async () => {
      const { result } = renderHook(() =>
        useAntModel(
          new Ant(
            copy(AntModelTestData.antInitialGridIndex),
            AntModelTestData.antInitialRotation
          ),
          new Grid(copy(AntModelTestData.initialGrid))
        )
      );

      act(() => result.current.start());
      act(() => jest.advanceTimersByTime(tickTimeUnit));
      act(() => result.current.stop());

      await waitFor(() => {
        expect(result.current.antData.gridIndex.row).toBe(1);
        expect(result.current.antData.gridIndex.col).toBe(0);
      });
    });

    it('should move the one cell left then one cell down after two ticks', async () => {
      const { result } = renderHook(() =>
        useAntModel(
          new Ant(copy(AntModelTestData.antInitialGridIndex), 0),
          new Grid(copy(AntModelTestData.initialGrid))
        )
      );

      act(() => result.current.start());
      act(() => jest.advanceTimersByTime(tickTimeUnit * 2));
      act(() => result.current.stop());

      await waitFor(() => {
        expect(result.current.antData.gridIndex.row).toBe(2);
        expect(result.current.antData.gridIndex.col).toBe(0);
      });
    });

    describe('when the ant is about to cross a grid boundary', () => {
      describe('top boundary', () => {
        it('should add an extra row of white cells at the top boundary', async () => {
          const { result } = renderHook(() =>
            useAntModel(
              new Ant(
                copy(AntModelTestData.antTopBoundaryGridIndex),
                AntModelTestData.antTopBoundaryRotation
              ),
              new Grid(copy(AntModelTestData.initialGrid))
            )
          );

          act(() => result.current.start());
          act(() => jest.advanceTimersByTime(tickTimeUnit));
          act(() => result.current.stop());

          await waitFor(() => {
            expect(result.current.gridData).toStrictEqual(
              AntModelTestData.gridTopBoundaryAdded
            );
          });
        });

        it('should adjust the ant grid index accordingly', async () => {
          const { result } = renderHook(() =>
            useAntModel(
              new Ant(
                copy(AntModelTestData.antTopBoundaryGridIndex),
                AntModelTestData.antTopBoundaryRotation
              ),
              new Grid(copy(AntModelTestData.initialGrid))
            )
          );

          act(() => result.current.start());
          act(() => jest.advanceTimersByTime(tickTimeUnit));
          act(() => result.current.stop());

          await waitFor(() => {
            expect(result.current.antData.gridIndex.row).toBe(0);
            expect(result.current.antData.gridIndex.col).toBe(1);
          });
        });
      });

      it('should add an extra column of white cells at the right boundary', async () => {
        const { result } = renderHook(() =>
          useAntModel(
            new Ant(
              copy(AntModelTestData.antRightBoundaryGridIndex),
              AntModelTestData.antRightBoundaryRotation
            ),
            new Grid(copy(AntModelTestData.initialGrid))
          )
        );

        act(() => result.current.start());
        act(() => jest.advanceTimersByTime(tickTimeUnit));
        act(() => result.current.stop());

        await waitFor(() => {
          expect(result.current.gridData).toStrictEqual(
            AntModelTestData.gridRightBoundaryAdded
          );
        });
      });
    });
  });
});
