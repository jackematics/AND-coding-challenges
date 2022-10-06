import { Board, BoardWrapper, Button, Row } from './MinesweeperDisplayStyle';

const MinesweeperDisplay = () => {
  const renderTiles = (tileRow: number[][]): JSX.Element => {
    return (
      <>
        {tileRow.map((tile, col) => (
          <Button title="tile" />
        ))}
      </>
    );
  };

  const renderTileRows = (): JSX.Element => {
    const tiles = Array(9).fill(Array(9).fill(0));

    return (
      <>
        {tiles.map((tileRow, row) => (
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
