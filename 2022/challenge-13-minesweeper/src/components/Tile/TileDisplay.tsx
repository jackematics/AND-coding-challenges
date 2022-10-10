import { useState } from 'react';
import Tile from '../../business-logic/tile';
import TileType from '../../enums/tile-type';
import GridIndex from '../../types/grid-index';
import SurroundingMinesRenderer from './SurroundingMinesRenderer';
import { TileImage } from './TileStyle';

interface TileDisplayProps {
  tile: Tile;
  gameOverCallback: (gameOver: boolean) => void;
}

const TileDisplay = ({ tile, gameOverCallback }: TileDisplayProps) => {
  const [lastClicked, setLastClicked] = useState<Tile>();

  const handleHiddenTileClick = (
    e: React.MouseEvent<HTMLElement>,
    tile: Tile
  ) => {
    tile.reveal();
    if (tile.getType() === TileType.Mine) {
      gameOverCallback(true);
    }

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
            onClick={(e) => handleHiddenTileClick(e, tile)}
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
