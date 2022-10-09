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
    const assigner = {
      assign: () => {
        return [
          [
            new Tile(TileType.Empty, { row: 0, col: 0 }),
            new Tile(TileType.Empty, { row: 0, col: 1 }),
            new Tile(TileType.Empty, { row: 0, col: 2 }),
          ],
          [
            new Tile(TileType.Empty, { row: 1, col: 0 }),
            new Tile(TileType.Empty, { row: 1, col: 1 }),
            new Tile(TileType.Empty, { row: 1, col: 2 }),
          ],
          [
            new Tile(TileType.Empty, { row: 2, col: 0 }),
            new Tile(TileType.Empty, { row: 2, col: 1 }),
            new Tile(TileType.Empty, { row: 2, col: 2 }),
          ],
        ];
      },
    };

    const minesweeper = new Minesweeper(assigner);
    render(<MinesweeperDisplay minesweeper={minesweeper} />);

    let noSurroundingMines = screen.getByTestId('1,1');

    fireEvent.click(noSurroundingMines);
    noSurroundingMines = screen.getByTestId('1,1');

    expect(noSurroundingMines.title).toBe('empty-tile');
  });

  it('should show a mine if a mine is clicked', () => {
    const assigner = {
      assign: () => {
        return [
          [
            new Tile(TileType.Empty, { row: 0, col: 0 }),
            new Tile(TileType.Empty, { row: 0, col: 1 }),
            new Tile(TileType.Empty, { row: 0, col: 2 }),
          ],
          [
            new Tile(TileType.Empty, { row: 1, col: 0 }),
            new Tile(TileType.Mine, { row: 1, col: 1 }),
            new Tile(TileType.Empty, { row: 1, col: 2 }),
          ],
          [
            new Tile(TileType.Empty, { row: 2, col: 0 }),
            new Tile(TileType.Empty, { row: 2, col: 1 }),
            new Tile(TileType.Empty, { row: 2, col: 2 }),
          ],
        ];
      },
    };

    const minesweeper = new Minesweeper(assigner);
    render(<MinesweeperDisplay minesweeper={minesweeper} />);

    let mine = screen.getByTestId('1,1');

    fireEvent.click(mine);
    mine = screen.getByTestId('1,1');

    expect(mine.title).toBe('red-mine-tile');
  });
});
