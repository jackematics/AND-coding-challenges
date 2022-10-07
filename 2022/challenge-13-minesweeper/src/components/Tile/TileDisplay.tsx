import { useState } from 'react';
import Tile from '../../business-logic/tile';
import { EmptyTile, HiddenTile } from './TileStyle';

interface TileDisplayProps {
  tile: Tile;
}

const TileDisplay = ({ tile }: TileDisplayProps) => {
  const [revealed, setRevealed] = useState<boolean>(false);

  const revealTile = (tile: Tile) => {
    tile.reveal();
    setRevealed(true);
  };

  const setTile = (tile: Tile): JSX.Element => {
    if (tile.isHidden())
      return (
        <>
          <HiddenTile
            title="hidden-tile"
            data-testid={`${tile.getGridIndex().row},${
              tile.getGridIndex().col
            }`}
            onClick={() => revealTile(tile)}
          />
        </>
      );

    return (
      <EmptyTile
        title="empty-tile"
        data-testid={`${tile.getGridIndex().row},${tile.getGridIndex().col}`}
      />
    );
  };

  return <>{setTile(tile)}</>;
};

export default TileDisplay;
