import Ant from './hooks/useAntModel/ant-grid-modeller/ant';
import AntGridModeller from './hooks/useAntModel/ant-grid-modeller/ant-grid-modeller';
import Grid from './hooks/useAntModel/ant-grid-modeller/grid';
import { Colour } from './hooks/useAntModel/enums/enums';

export default class AntGridModellerFactory {
  public static createDefaultAntGridModeller(): AntGridModeller {
    return new AntGridModeller(
      new Ant({ row: 3, col: 3 }, 0),
      new Grid([
        [
          Colour.White,
          Colour.White,
          Colour.White,
          Colour.White,
          Colour.White,
          Colour.White,
          Colour.White,
        ],
        [
          Colour.White,
          Colour.White,
          Colour.White,
          Colour.White,
          Colour.White,
          Colour.White,
          Colour.White,
        ],
        [
          Colour.White,
          Colour.White,
          Colour.White,
          Colour.White,
          Colour.White,
          Colour.White,
          Colour.White,
        ],
        [
          Colour.White,
          Colour.White,
          Colour.White,
          Colour.White,
          Colour.White,
          Colour.White,
          Colour.White,
        ],
        [
          Colour.White,
          Colour.White,
          Colour.White,
          Colour.White,
          Colour.White,
          Colour.White,
          Colour.White,
        ],
        [
          Colour.White,
          Colour.White,
          Colour.White,
          Colour.White,
          Colour.White,
          Colour.White,
          Colour.White,
        ],
        [
          Colour.White,
          Colour.White,
          Colour.White,
          Colour.White,
          Colour.White,
          Colour.White,
          Colour.White,
        ],
      ])
    );
  }
}
