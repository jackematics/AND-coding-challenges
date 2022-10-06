import { render, screen } from '@testing-library/react';
import MinesweeperDisplay from './MinesweeperDisplay';

describe('MinesweeperDisplay', () => {
  it('should render the initial minesweeper display as a grid of 9 x 9 tiles', () => {
    render(<MinesweeperDisplay />);

    const tiles = screen.getAllByTitle('tile');

    expect(tiles.length).toBe(81);
  });
});
