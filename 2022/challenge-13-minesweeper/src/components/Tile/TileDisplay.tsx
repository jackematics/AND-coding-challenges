import { useState } from 'react';
import Tile from '../../business-logic/tile';
import TileType from '../../enums/tile-type';
import SurroundingMinesRenderer from './SurroundingMinesRenderer';
import { TileImage } from './TileStyle';

interface TileDisplayProps {
  tile: Tile;
  gameOverCallback: (gameOver: boolean) => void;
  revealSurroundingTilesCallback: (tile: Tile) => void;
  clickable: boolean;
}

const TileDisplay = ({
  tile,
  gameOverCallback,
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
    gameOverCallback(tile.getType() === TileType.Mine ? true : false);
    revealSurroundingIfAllEmpty(tile);
    tile.reveal();
    setLastClicked(tile);
  };

  const handleFlagSet = (e: any, tile: Tile) => {
    e.preventDefault();
    tile.toggleMineFlag();
    setMineFlagged(tile.mineFlagged());
  };

  const setTile = (tile: Tile) => {
    if (tile.isHidden()) {
      if (tile.mineFlagged())
        return (
          <TileImage
            title="flagged-tile"
            src="/assets/flagged-tile.svg"
            data-testid={`${tile.getGridIndex().row},${
              tile.getGridIndex().col
            }`}
            onClick={() => (clickable ? handleHiddenTileClick(tile) : '')}
            onContextMenu={(e) => (clickable ? handleFlagSet(e, tile) : '')}
            onDragStart={(e) => e.preventDefault()}
          />
        );

      return (
        <TileImage
          title="hidden-tile"
          src="/assets/hidden-tile.svg"
          data-testid={`${tile.getGridIndex().row},${tile.getGridIndex().col}`}
          onClick={() => (clickable ? handleHiddenTileClick(tile) : '')}
          onContextMenu={(e) => (clickable ? handleFlagSet(e, tile) : '')}
          onDragStart={(e) => e.preventDefault()}
        />
      );
    }

    if (tile.getType() === TileType.Mine) {
      const mineType = lastClicked === tile ? 'red-mine-tile' : 'mine-tile';
      return (
        <TileImage
          title={mineType}
          src={`/assets/${mineType}.svg`}
          data-testid={`${tile.getGridIndex().row},${tile.getGridIndex().col}`}
        />
      );
    }

    return SurroundingMinesRenderer.render(tile);
  };

  return <>{setTile(tile)}</>;
};

export default TileDisplay;
