import { useEffect, useReducer, useState } from 'react';
import Minesweeper from '../../business-rules/minesweeper';
import Tile from '../../business-rules/tile';
import Difficulty from '../../enums/difficulty';
import GameState from '../../enums/game-state';
import TileType from '../../enums/tile-type';
import TileDisplay from '../tile-display/TileDisplay';
import { Board, BoardWrapper, Face, Row } from './MinesweeperDisplayStyle';

type MinesweeperProps = {
  minesweeper: Minesweeper;
  difficulty: Difficulty;
};

const MinesweeperDisplay = ({ minesweeper, difficulty }: MinesweeperProps) => {
  const [gameState, setGameState] = useState<GameState>(GameState.InPlay);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    minesweeper.reset();
    setGameState(GameState.InPlay);
    forceUpdate();
  }, [difficulty]);

  const setFaceType = () => {
    return {
      [GameState.InPlay]: 'happy-face',
      [GameState.GameOver]: 'sad-face',
      [GameState.GameWin]: 'sunglasses-face',
    }[gameState];
  };

  const handleGameReset = () => {
    minesweeper.reset();
    setGameState(GameState.InPlay);
    forceUpdate();
  };

  const handleGameOverCheck = (tile: Tile) => {
    if (tile.getType() === TileType.Mine ? true : false) {
      minesweeper.gameOver();
      setGameState(GameState.GameOver);
    }
  };

  const handleWinCheck = () => {
    if (minesweeper.gameWin()) {
      setGameState(GameState.GameWin);
    }
  };

  const handleGameStateCheck = (tile: Tile) => {
    handleGameOverCheck(tile);
    handleWinCheck();
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
            checkGameStateCallback={handleGameStateCheck}
            revealSurroundingTilesCallback={() => revealSurroundingTiles(tile)}
            clickable={gameState === GameState.InPlay}
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
      <Face
        title={setFaceType()}
        src={`/assets/${setFaceType()}.svg`}
        onClick={() => handleGameReset()}
      />
      <BoardWrapper>
        <Board>{renderTileRows()}</Board>
      </BoardWrapper>
    </>
  );
};

export default MinesweeperDisplay;
