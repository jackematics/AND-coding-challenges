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

  describe('when an empty square with no surrounding minds is clicked', () => {
    let minesweeper: Minesweeper;
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
          [
            new Tile(TileType.Empty, { row: 3, col: 0 }),
            new Tile(TileType.Empty, { row: 3, col: 1 }),
            new Tile(TileType.Mine, { row: 3, col: 2 }),
          ],
        ];
      },
    };

    beforeEach(() => {
      minesweeper = new Minesweeper(assigner);
    });

    it('should show an empty square', () => {
      render(<MinesweeperDisplay minesweeper={minesweeper} />);

      let noSurroundingMines = screen.getByTestId('1,1');

      fireEvent.click(noSurroundingMines);
      const revealedTile = screen.getByTestId('1,1');

      expect(revealedTile.title).toBe('empty-tile');
    });

    it('should reveal all squares around the empty tile and subsequent empty tiles revealed', () => {
      render(<MinesweeperDisplay minesweeper={minesweeper} />);

      let noSurroundingMines = screen.getByTestId('1,1');

      fireEvent.click(noSurroundingMines);

      const revealedTiles = screen.getAllByTitle('empty-tile');

      expect(revealedTiles.length).toBe(11);
    });
  });

  it.each([
    { surroundingMines: 1, tileTitle: 'one-tile' },
    { surroundingMines: 2, tileTitle: 'two-tile' },
    { surroundingMines: 3, tileTitle: 'three-tile' },
    { surroundingMines: 4, tileTitle: 'four-tile' },
    { surroundingMines: 5, tileTitle: 'five-tile' },
    { surroundingMines: 6, tileTitle: 'six-tile' },
    { surroundingMines: 7, tileTitle: 'seven-tile' },
    { surroundingMines: 8, tileTitle: 'eight-tile' },
  ])(
    'should show a $surroundingMines if there are $surroundingMines surrounding mines',
    ({ surroundingMines, tileTitle }) => {
      const assigner = {
        assign: () => {
          const grid = [[new Tile(TileType.Empty, { row: 1, col: 1 })]];

          grid[0][0].setSurroundingMineCount(surroundingMines);

          return grid;
        },
      };

      const minesweeper = new Minesweeper(assigner);
      render(<MinesweeperDisplay minesweeper={minesweeper} />);

      let oneSurroundingMine = screen.getByTestId('1,1');

      fireEvent.click(oneSurroundingMine);
      const revealedTile = screen.getByTestId('1,1');

      expect(revealedTile.title).toBe(tileTitle);
    }
  );

  describe('When a mine is clicked', () => {
    let minesweeper: Minesweeper;
    const assigner = {
      assign: () => {
        return [
          [
            new Tile(TileType.Mine, { row: 0, col: 0 }),
            new Tile(TileType.Empty, { row: 0, col: 1 }),
            new Tile(TileType.Mine, { row: 0, col: 2 }),
          ],
          [
            new Tile(TileType.Mine, { row: 1, col: 0 }),
            new Tile(TileType.Mine, { row: 1, col: 1 }),
            new Tile(TileType.Empty, { row: 1, col: 2 }),
          ],
        ];
      },
    };

    beforeEach(() => {
      minesweeper = new Minesweeper(assigner);
    });

    it('should show a mine', () => {
      render(<MinesweeperDisplay minesweeper={minesweeper} />);
      let mine = screen.getByTestId('1,1');
      fireEvent.click(mine);
      mine = screen.getByTestId('1,1');
      expect(mine.title).toBe('red-mine-tile');
    });

    it('should reveal all other mines on screen', () => {
      render(<MinesweeperDisplay minesweeper={minesweeper} />);

      let mine = screen.getByTestId('1,1');
      fireEvent.click(mine);
      const allOtherMines = screen.getAllByTitle('mine-tile');
      expect(allOtherMines.length).toBe(3);
    });

    it('should make all other tiles unclickable', () => {
      render(<MinesweeperDisplay minesweeper={minesweeper} />);

      let mine = screen.getByTestId('1,1');
      fireEvent.click(mine);

      let shouldBeUnclickable = screen.getByTestId('0,1');
      fireEvent.click(shouldBeUnclickable);
      shouldBeUnclickable = screen.getByTestId('0,1');

      expect(shouldBeUnclickable.title).toBe('hidden-tile');
    });
  });

  describe('when a hidden tile is right-clicked', () => {
    it('should flag the tile as a potential mine', () => {
      const assigner = {
        assign: () => {
          return [
            [
              new Tile(TileType.Empty, { row: 0, col: 0 }),
              new Tile(TileType.Mine, { row: 0, col: 1 }),
              new Tile(TileType.Empty, { row: 0, col: 2 }),
            ],
          ];
        },
      };

      const minesweeper = new Minesweeper(assigner);

      render(<MinesweeperDisplay minesweeper={minesweeper} />);

      const hiddenTile = screen.getByTestId('0,1');
      fireEvent.contextMenu(hiddenTile);

      const flaggedTile = screen.getByTestId('0,1');

      expect(flaggedTile.title).toBe('flagged-tile');
    });
  });
});
