import { fireEvent, render, screen } from '@testing-library/react';
import GameAssigner from '../../business-logic/game-assigner';
import Minesweeper from '../../business-logic/minesweeper';
import Tile from '../../business-logic/tile';
import TileType from '../../enums/tile-type';
import MinesweeperDisplay from './MinesweeperDisplay';

describe('MinesweeperDisplay', () => {
  it('should render the initial minesweeper display as a grid of 9 x 9 tiles', () => {
    const assigner = new GameAssigner({ rows: 9, cols: 9, mines: 10 });
    const minesweeper = new Minesweeper(assigner);
    render(<MinesweeperDisplay minesweeper={minesweeper} />);

    const tiles = screen.getAllByTitle('hidden-tile');

    expect(tiles.length).toBe(81);
  });

  it('should show an empty square if there are no surrounding mines', () => {
    const metadata = { rows: 3, cols: 3 };

    const assigner = {
      assign: () => {
        const grid: Tile[][] = [];

        for (let row = 0; row < metadata.rows; row++) {
          let currentRow = [];
          for (let col = 0; col < metadata.cols; col++) {
            currentRow.push(new Tile(TileType.Empty, { row, col }));
          }

          grid.push(currentRow);
        }

        return grid;
      },
    };

    const minesweeper = new Minesweeper(assigner);
    render(<MinesweeperDisplay minesweeper={minesweeper} />);

    let noSurroundingMines = screen.getByTestId('1,1');

    fireEvent.click(noSurroundingMines);
    noSurroundingMines = screen.getByTestId('1,1');
    const style = window.getComputedStyle(noSurroundingMines);

    expect(noSurroundingMines.title).toBe('empty-tile');
    expect(style.backgroundColor).toBe('rgb(219, 219, 219)');
    expect(style.border).toBe('1px solid #575757');
  });
});
