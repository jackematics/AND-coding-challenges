import Minesweeper from '../../business-logic/minesweeper';
import Tile from '../../business-logic/tile';
import TileDisplay from '../Tile/TileDisplay';
import { Board, BoardWrapper, Row } from './MinesweeperDisplayStyle';

type MinesweeperProps = {
  minesweeper: Minesweeper;
};

const MinesweeperDisplay = ({ minesweeper }: MinesweeperProps) => {
  const renderTiles = (tileRow: Tile[]): JSX.Element => {
    return (
      <>
        {tileRow.map((tile, col) => (
          <TileDisplay tile={tile} />
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
