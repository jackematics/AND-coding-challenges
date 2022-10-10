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

  const handleHiddenTileClick = (tile: Tile) => {
    if (tile.getType() === TileType.Mine) {
      gameOverCallback(true);
    }

    if (
      tile.getType() === TileType.Empty &&
      tile.getSurroundingMineCount() === 0
    ) {
      revealSurroundingTilesCallback(tile);
    }
    tile.reveal();

    setLastClicked(tile);
  };

  const setTile = (tile: Tile) => {
    if (tile.isHidden())
      return (
        <>
          <TileImage
            title="hidden-tile"
            src="/assets/hidden-tile.svg"
            data-testid={`${tile.getGridIndex().row},${
              tile.getGridIndex().col
            }`}
            onClick={() => (clickable ? handleHiddenTileClick(tile) : '')}
            onDragStart={(e) => e.preventDefault()}
          />
        </>
      );

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
