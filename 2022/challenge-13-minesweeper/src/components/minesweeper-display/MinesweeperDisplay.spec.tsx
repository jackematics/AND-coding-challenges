import { fireEvent, render, screen } from '@testing-library/react';
import Minesweeper from '../../business-logic/minesweeper';
import MinesweeperDisplay from './MinesweeperDisplay';

describe('MinesweeperDisplay', () => {
  it('should render the initial minesweeper display as a grid of 9 x 9 tiles', () => {
    const minesweeper = new Minesweeper({ rows: 9, cols: 9, mines: 10 });
    render(<MinesweeperDisplay model={minesweeper} />);

    const tiles = screen.getAllByTitle('tile');

    expect(tiles.length).toBe(81);
  });

  it('should show an empty square if there are no surrounding mines', () => {
    const minesweeper = new Minesweeper({ rows: 9, cols: 9, mines: 2 });
    minesweeper.mineLocation = { row: 3, col: 1 };
    minesweeper.mineLocation = { row: 1, col: 3 };

    render(<MinesweeperDisplay model={minesweeper} />);

    const noSurroundingMines = screen.getByTestId('1,1');
    fireEvent.click(noSurroundingMines);
    const style = window.getComputedStyle(noSurroundingMines);

    expect(style.backgroundColor).toBe('rgb(219, 219, 219)');
    expect(style.borderTop).toBe('1px solid #575757');
    expect(style.borderRight).toBe('1px solid #575757');
    expect(style.borderBottom).toBe('1px solid #575757');
    expect(style.borderLeft).toBe('1px solid #575757');
  });
});
