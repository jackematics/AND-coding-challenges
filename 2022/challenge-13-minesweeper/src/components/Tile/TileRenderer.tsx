import Tile from '../../business-logic/tile';
import HiddenType from '../../enums/hidden-type';
import MineType from '../../enums/mine-type';
import GridIndex from '../../types/grid-index';
import { TileImage } from './TileStyle';

export default class TileRenderer {
  static renderHiddenTile(
    hiddenType: HiddenType,
    tile: Tile,
    handleHiddenTileClick: (tile: Tile) => void,
    handleFlagSet: (e: any, tile: Tile) => void
  ) {
    return (
      <TileImage
        title={hiddenType}
        src={`/assets/${hiddenType}.svg`}
        data-testid={`${tile.getGridIndex().row},${tile.getGridIndex().col}`}
        onClick={() => handleHiddenTileClick(tile)}
        onContextMenu={(e) => handleFlagSet(e, tile)}
        onDragStart={(e) => e.preventDefault()}
      />
    );
  }

  public static renderMineTile(mineType: MineType, tileGridIndex: GridIndex) {
    return (
      <TileImage
        title={mineType}
        src={`/assets/${mineType}.svg`}
        data-testid={`${tileGridIndex.row},${tileGridIndex.col}`}
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
      />
    );
  }

  public static renderNumericalTile(tile: Tile) {
    const testId = `${tile.getGridIndex().row},${tile.getGridIndex().col}`;

    return (
      <TileImage
        title={`${tile.getSurroundingMineCount()}-tile`}
        src={`/assets/${tile.getSurroundingMineCount()}-tile.svg`}
        data-testid={testId}
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
      />
    );
  }
}
