import { useState } from 'react';
import Tile from '../../business-logic/tile';
import TileType from '../../enums/tile-type';
import SurroundingMinesRenderer from './SurroundingMinesRenderer';
import { TileImage } from './TileStyle';

interface TileDisplayProps {
  tile: Tile;
}

const TileDisplay = ({ tile }: TileDisplayProps) => {
  const [revealed, setRevealed] = useState<boolean>(false);

  const revealTile = (e: React.MouseEvent<HTMLElement>, tile: Tile) => {
    tile.reveal();
    setRevealed(true);
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
            onClick={(e) => revealTile(e, tile)}
            onDragStart={(e) => e.preventDefault()}
          />
        </>
      );

    if (tile.getType() === TileType.Mine)
      return (
        <TileImage
          title="red-mine-tile"
          src="/assets/red-mine-tile.svg"
          data-testid={`${tile.getGridIndex().row},${tile.getGridIndex().col}`}
        />
      );

    return SurroundingMinesRenderer.render(tile);
  };

  return <>{setTile(tile)}</>;
};

export default TileDisplay;
