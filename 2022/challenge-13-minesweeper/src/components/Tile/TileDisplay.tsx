import { MouseEvent, useState } from 'react';
import Tile from '../../business-logic/tile';
import TileType from '../../enums/tile-type';
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

  const setTile = (tile: Tile): JSX.Element => {
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

    return tile.getType() === TileType.Empty ? (
      <TileImage
        title="empty-tile"
        src="/assets/empty-tile.svg"
        data-testid={`${tile.getGridIndex().row},${tile.getGridIndex().col}`}
      />
    ) : (
      <TileImage
        title="red-mine-tile"
        src="/assets/red-mine-tile.svg"
        data-testid={`${tile.getGridIndex().row},${tile.getGridIndex().col}`}
      />
    );
  };

  return <>{setTile(tile)}</>;
};

export default TileDisplay;
