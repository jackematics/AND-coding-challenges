import { useState } from 'react';
import Minesweeper from '../../business-logic/minesweeper';
import Tile from '../../business-logic/tile';
import TileType from '../../enums/tile-type';
import TileDisplay from '../Tile/TileDisplay';
import { Board, BoardWrapper, Row } from './MinesweeperDisplayStyle';

type MinesweeperProps = {
  minesweeper: Minesweeper;
};

const MinesweeperDisplay = ({ minesweeper }: MinesweeperProps) => {
  const [gameOver, setGameOver] = useState<boolean>(false);

  const handleGameOver = (gameOver: boolean) => {
    if (gameOver) {
      minesweeper.getGrid().forEach((row) => {
        row.forEach((tile) => {
          if (tile.getType() === TileType.Mine) {
            tile.reveal();
          }
        });
      });

      setGameOver(true);
    }
  };

  const renderTiles = (tileRow: Tile[]): JSX.Element => {
    return (
      <>
        {tileRow.map((tile, col) => (
          <TileDisplay tile={tile} gameOverCallback={handleGameOver} />
        ))}
      </>
    );
  };

  const renderTileRows = (): JSX.Element => {
    return (
      <>
        {minesweeper.getGrid().map((tileRow, row) => (
          <Row>{renderTiles(tileRow)}</Row>
        ))}
      </>
    );
  };

  return (
    <>
      <BoardWrapper>
        <Board>{renderTileRows()}</Board>
      </BoardWrapper>
    </>
  );
};

export default MinesweeperDisplay;
