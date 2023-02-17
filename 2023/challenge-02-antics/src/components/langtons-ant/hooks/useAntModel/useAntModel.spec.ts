import { act, renderHook } from '@testing-library/react';
import { Colour, Direction } from './enums/enums';
import useAntModel from '../useAntModel/useAntModel';
import Ant from './ant';
import Grid from './grid/grid';

describe('useAntModel', () => {
  describe('tick()', () => {
    it('should turn the ant current cell black if initially white', async () => {
      const antGridIndex = { row: 1, col: 1 };
      const antDirection = Direction.Up;

      const { result } = renderHook(() =>
        useAntModel(
          new Ant({ ...antGridIndex }, antDirection),
          new Grid([
            [Colour.White, Colour.White, Colour.White],
            [Colour.White, Colour.White, Colour.White],
            [Colour.White, Colour.White, Colour.White],
          ])
        )
      );
      act(() => result.current.tick());
      expect(result.current.gridData[antGridIndex.row][antGridIndex.col]).toBe(
        Colour.Black
      );
    });

    it('should turn the ant current cell white if black', () => {
      const antGridIndex = { row: 1, col: 1 };
      const antDirection = Direction.Up;

      const { result } = renderHook(() =>
        useAntModel(
          new Ant({ ...antGridIndex }, antDirection),
          new Grid([
            [Colour.White, Colour.White, Colour.White],
            [Colour.White, Colour.Black, Colour.White],
            [Colour.White, Colour.White, Colour.White],
          ])
        )
      );

      act(() => result.current.tick());

      expect(result.current.gridData[antGridIndex.row][antGridIndex.col]).toBe(
        Colour.White
      );
    });
  });
});
