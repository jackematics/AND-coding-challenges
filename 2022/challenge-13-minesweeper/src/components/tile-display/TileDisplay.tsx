import { useState } from 'react';
import Tile from '../../business-rules/tile';
import HiddenType from '../../enums/hidden-type';
import MineType from '../../enums/mine-type';
import TileType from '../../enums/tile-type';
import TileRenderer from './TileRenderer';

interface TileDisplayProps {
  tile: Tile;
  checkGameStateCallback: (tile: Tile) => void;
  revealSurroundingTilesCallback: (tile: Tile) => void;
  clickable: boolean;
}

const TileDisplay = ({
  tile,
  checkGameStateCallback,
  revealSurroundingTilesCallback,
  clickable,
}: TileDisplayProps) => {
  const [lastClicked, setLastClicked] = useState<Tile>();
  const [mineFlagged, setMineFlagged] = useState<boolean>(false);

  const revealSurroundingIfAllEmpty = (tile: Tile) => {
    if (
      tile.getType() === TileType.Empty &&
      tile.getSurroundingMineCount() === 0
    ) {
      revealSurroundingTilesCallback(tile);
    }
  };

  const handleHiddenTileClick = (tile: Tile) => {
    if (clickable) {
      revealSurroundingIfAllEmpty(tile);
      tile.reveal();
      setLastClicked(tile);
      checkGameStateCallback(tile);
    }
  };

  const handleFlagSet = (e: any, tile: Tile) => {
    if (clickable) {
      e.preventDefault();
      tile.toggleMineFlag();
      setMineFlagged(!mineFlagged);
    }
  };

  const setTile = (tile: Tile) => {
    if (tile.isHidden()) {
      const hiddenType = tile.mineFlagged()
        ? HiddenType.Flagged
        : HiddenType.Hidden;

      return TileRenderer.renderHiddenTile(
        hiddenType,
        tile,
        handleHiddenTileClick,
        handleFlagSet
      );
    }

    if (tile.getType() === TileType.Mine) {
      const mineType = lastClicked === tile ? MineType.RedMine : MineType.Mine;
      return TileRenderer.renderMineTile(mineType, tile.getGridIndex());
    }

    return TileRenderer.renderNumericalTile(tile);
  };

  return <>{setTile(tile)}</>;
};

export default TileDisplay;
