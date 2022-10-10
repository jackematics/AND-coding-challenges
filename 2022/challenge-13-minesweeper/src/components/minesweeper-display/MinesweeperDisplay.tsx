import { useReducer, useState } from 'react';
import Minesweeper from '../../business-logic/minesweeper';
import Tile from '../../business-logic/tile';
import TileDisplay from '../Tile/TileDisplay';
import { Board, BoardWrapper, Row } from './MinesweeperDisplayStyle';

type MinesweeperProps = {
  minesweeper: Minesweeper;
};

const MinesweeperDisplay = ({ minesweeper }: MinesweeperProps) => {
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const handleGameOver = (isGameOver: boolean) => {
    if (isGameOver) {
      minesweeper.gameOver();
      setGameOver(true);
    }
  };

  const revealSurroundingTiles = (tile: Tile) => {
    minesweeper.revealSurroundingTiles(tile);
    forceUpdate();
  };

  const renderTiles = (tileRow: Tile[]): JSX.Element => {
    return (
      <>
        {tileRow.map((tile, col) => (
          <TileDisplay
            tile={tile}
            gameOverCallback={handleGameOver}
            revealSurroundingTilesCallback={() => revealSurroundingTiles(tile)}
            clickable={!gameOver}
          />
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
