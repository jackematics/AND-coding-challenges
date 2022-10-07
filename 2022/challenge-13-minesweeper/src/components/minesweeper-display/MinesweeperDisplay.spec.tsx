import { render, screen } from '@testing-library/react';
import Minesweeper from '../../business-logic/minesweeper';
import MinesweeperDisplay from './MinesweeperDisplay';

describe('MinesweeperDisplay', () => {
  it('should render the initial minesweeper display as a grid of 9 x 9 tiles', () => {
    const minesweeper = new Minesweeper({ rows: 9, cols: 9, mines: 10 });
    render(<MinesweeperDisplay minesweeper={minesweeper} />);

    const tiles = screen.getAllByTitle('hidden-tile');

    expect(tiles.length).toBe(81);
  });
});
