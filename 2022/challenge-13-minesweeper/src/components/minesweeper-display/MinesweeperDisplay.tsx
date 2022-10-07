import { useReducer } from 'react';
import Minesweeper from '../../business-logic/minesweeper';
import Tile from '../../business-logic/tile';
import TileType from '../../enums/tile-type';
import GridIndex from '../../types/grid-index';
import {
  Board,
  BoardWrapper,
  TileDisplay,
  Row,
} from './MinesweeperDisplayStyle';

type MinesweeperProps = {
  model: Minesweeper;
};

const MinesweeperDisplay = ({ model }: MinesweeperProps) => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const setTileStyle = (tile: Tile): TileStyle => {
    if (tile.isHidden()) {
      return {
        backgroundColour: '#d6d4d4',
        borderTop: '3px solid white',
        borderRight: '3px solid grey',
        borderBottom: '3px solid grey',
        borderLeft: '3px solid white',
      };
    }

    return {
      backgroundColour: '#dbdbdb',
      borderTop: '1px solid #575757',
      borderRight: '1px solid #575757',
      borderBottom: '1px solid #575757',
      borderLeft: '1px solid #575757',
    };
  };

  const handleTileClick = (tile: Tile) => {
    tile.reveal();
    forceUpdate();
  };

  const renderTiles = (tileRow: Tile[], row: number): JSX.Element => {
    return (
      <>
        {tileRow.map((tile, col) => (
          <TileDisplay
            title="tile"
            tileStyle={setTileStyle(tile)}
            data-testid={`${row},${col}`}
            onClick={() => handleTileClick(tile)}
          />
        ))}
      </>
    );
  };

  const renderTileRows = (): JSX.Element => {
    return (
      <>
        {model.getGrid().map((tileRow, row) => (
          <Row>{renderTiles(tileRow, row)}</Row>
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
