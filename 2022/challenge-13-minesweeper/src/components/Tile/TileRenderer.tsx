import Tile from '../../business-logic/tile';
import MineType from '../../enums/mine-type';
import GridIndex from '../../types/grid-index';
import { TileImage } from './TileStyle';

export default class TileRenderer {
  public static renderMineTile(mineType: MineType, tileGridIndex: GridIndex) {
    return (
      <TileImage
        title={mineType}
        src={`/assets/${mineType}.svg`}
        data-testid={`${tileGridIndex.row},${tileGridIndex.col}`}
      />
    );
  }

  public static renderNumericalTile(tile: Tile) {
    const testId = `${tile.getGridIndex().row},${tile.getGridIndex().col}`;

    return {
      0: (
        <TileImage
          title="empty-tile"
          src="/assets/empty-tile.svg"
          data-testid={testId}
        />
      ),
      1: (
        <TileImage
          title="one-tile"
          src="/assets/one-tile.svg"
          data-testid={testId}
        />
      ),
      2: (
        <TileImage
          title="two-tile"
          src="/assets/two-tile.svg"
          data-testid={testId}
        />
      ),
      3: (
        <TileImage
          title="three-tile"
          src="/assets/three-tile.svg"
          data-testid={testId}
        />
      ),
      4: (
        <TileImage
          title="four-tile"
          src="/assets/four-tile.svg"
          data-testid={testId}
        />
      ),
      5: (
        <TileImage
          title="five-tile"
          src="/assets/five-tile.svg"
          data-testid={testId}
        />
      ),
      6: (
        <TileImage
          title="six-tile"
          src="/assets/six-tile.svg"
          data-testid={testId}
        />
      ),
      7: (
        <TileImage
          title="seven-tile"
          src="/assets/seven-tile.svg"
          data-testid={testId}
        />
      ),
      8: (
        <TileImage
          title="eight-tile"
          src="/assets/eight-tile.svg"
          data-testid={testId}
        />
      ),
    }[tile.getSurroundingMineCount()];
  }
}
