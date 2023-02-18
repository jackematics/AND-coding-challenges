import { act, renderHook } from '@testing-library/react';
import { Colour } from './enums/enums';
import useAntModel from '../useAntModel/useAntModel';
import Ant from './ant';
import Grid from './grid/grid';
import AntModelTestData from './ant-model-test-data';

describe('useAntModel', () => {
  describe('tick()', () => {
    describe('when ant cell is initially white', () => {
      it('should turn the ant current cell black', async () => {
        const { result } = renderHook(() =>
          useAntModel(
            new Ant({ ...AntModelTestData.antInitialGridIndex }, 0),
            new Grid({ ...AntModelTestData.initialGridWhiteCentre })
          )
        );
        act(() => result.current.tick());
        expect(
          result.current.gridData[AntModelTestData.antInitialGridIndex.row][
            AntModelTestData.antInitialGridIndex.col
          ]
        ).toBe(Colour.Black);
      });

      it('should set the ant to face left', () => {
        const { result } = renderHook(() =>
          useAntModel(
            new Ant({ ...AntModelTestData.antInitialGridIndex }, 0),
            new Grid({ ...AntModelTestData.initialGridWhiteCentre })
          )
        );
        act(() => result.current.tick());
        expect(result.current.antData.rotation).toBe(270);
      });
    });

    describe('when the ant cell is initially black', () => {
      it('should turn the ant current cell white', () => {
        const { result } = renderHook(() =>
          useAntModel(
            new Ant({ ...AntModelTestData.antInitialGridIndex }, 0),
            new Grid({ ...AntModelTestData.initialGridBlackCentre })
          )
        );

        act(() => result.current.tick());

        expect(
          result.current.gridData[AntModelTestData.antInitialGridIndex.row][
            AntModelTestData.antInitialGridIndex.col
          ]
        ).toBe(Colour.White);
      });

      it('should set the ant to face right', () => {
        const { result } = renderHook(() =>
          useAntModel(
            new Ant({ ...AntModelTestData.antInitialGridIndex }, 0),
            new Grid({ ...AntModelTestData.initialGridBlackCentre })
          )
        );
        act(() => result.current.tick());
        expect(result.current.antData.rotation).toBe(90);
      });
    });
  });
});
