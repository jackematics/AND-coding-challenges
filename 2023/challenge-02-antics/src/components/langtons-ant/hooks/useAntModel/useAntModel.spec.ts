import { act, renderHook } from '@testing-library/react';
import { Colour } from './enums/enums';
import useAntModel from '../useAntModel/useAntModel';
import Ant from './ant';
import Grid from './grid/grid';

describe('useAntModel', () => {
  describe('tick()', () => {
    describe('when ant cell is initially white', () => {
      it('should turn the ant current cell black', async () => {
        const antGridIndex = { row: 1, col: 1 };

        const { result } = renderHook(() =>
          useAntModel(
            new Ant({ ...antGridIndex }, 0),
            new Grid([
              [Colour.White, Colour.White, Colour.White],
              [Colour.White, Colour.White, Colour.White],
              [Colour.White, Colour.White, Colour.White],
            ])
          )
        );
        act(() => result.current.tick());
        expect(
          result.current.gridData[antGridIndex.row][antGridIndex.col]
        ).toBe(Colour.Black);
      });

      it('should set the ant to face left', () => {
        const antGridIndex = { row: 1, col: 1 };

        const { result } = renderHook(() =>
          useAntModel(
            new Ant({ ...antGridIndex }, 0),
            new Grid([
              [Colour.White, Colour.White, Colour.White],
              [Colour.White, Colour.White, Colour.White],
              [Colour.White, Colour.White, Colour.White],
            ])
          )
        );
        act(() => result.current.tick());
        expect(result.current.antData.rotation).toBe(270);
      });
    });

    describe('when the ant cell is initially black', () => {
      it('should turn the ant current cell white', () => {
        const antGridIndex = { row: 1, col: 1 };

        const { result } = renderHook(() =>
          useAntModel(
            new Ant({ ...antGridIndex }, 0),
            new Grid([
              [Colour.White, Colour.White, Colour.White],
              [Colour.White, Colour.Black, Colour.White],
              [Colour.White, Colour.White, Colour.White],
            ])
          )
        );

        act(() => result.current.tick());

        expect(
          result.current.gridData[antGridIndex.row][antGridIndex.col]
        ).toBe(Colour.White);
      });

      it('should set the ant to face right', () => {
        const antGridIndex = { row: 1, col: 1 };

        const { result } = renderHook(() =>
          useAntModel(
            new Ant({ ...antGridIndex }, 0),
            new Grid([
              [Colour.White, Colour.White, Colour.White],
              [Colour.White, Colour.Black, Colour.White],
              [Colour.White, Colour.White, Colour.White],
            ])
          )
        );
        act(() => result.current.tick());
        expect(result.current.antData.rotation).toBe(90);
      });
    });
  });
});
