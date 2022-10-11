import { fireEvent, render, screen } from '@testing-library/react';
import GameAssigner from '../business-rules/game-assigner';
import Minesweeper from '../business-rules/minesweeper';
import Tile from '../business-rules/tile';
import MinesweeperDisplay from '../components/minesweeper-display/MinesweeperDisplay';
import TileType from '../enums/tile-type';

describe('MinesweeperDisplay', () => {
  it('should render the initial minesweeper display as a grid of 9 x 9 tiles', () => {
    const assigner = new GameAssigner({ rows: 9, cols: 9, mines: 10 });
    const minesweeper = new Minesweeper(assigner);
    render(<MinesweeperDisplay minesweeper={minesweeper} />);

    const tiles = screen.getAllByTitle('hidden-tile');

    expect(tiles.length).toBe(81);
  });

  it('should reset the game when the face is clicked', () => {
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
            new Tile(TileType.Mine, { row: 2, col: 1 }),
            new Tile(TileType.Empty, { row: 3, col: 2 }),
          ],
        ];
      },
    };
    const minesweeper = new Minesweeper(assigner);
    render(<MinesweeperDisplay minesweeper={minesweeper} />);

    const tile = screen.getByTestId('0,0');

    fireEvent.click(tile);

    const face = screen.getByTitle('happy-face');
    fireEvent.click(face);

    const refreshedTiles = screen.getAllByTitle('hidden-tile');

    expect(refreshedTiles.length).toBe(6);
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

      expect(revealedTile.title).toBe('0-tile');
    });

    it('should reveal all squares around the empty tile and subsequent empty tiles revealed', () => {
      render(<MinesweeperDisplay minesweeper={minesweeper} />);

      let noSurroundingMines = screen.getByTestId('1,1');

      fireEvent.click(noSurroundingMines);

      const revealedTiles = screen.getAllByTitle('0-tile');

      expect(revealedTiles.length).toBe(11);
    });
  });

  it.each([
    { surroundingMines: 1, tileTitle: '1-tile' },
    { surroundingMines: 2, tileTitle: '2-tile' },
    { surroundingMines: 3, tileTitle: '3-tile' },
    { surroundingMines: 4, tileTitle: '4-tile' },
    { surroundingMines: 5, tileTitle: '5-tile' },
    { surroundingMines: 6, tileTitle: '6-tile' },
    { surroundingMines: 7, tileTitle: '7-tile' },
    { surroundingMines: 8, tileTitle: '8-tile' },
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

  describe('When a game ends', () => {
    let minesweeper: Minesweeper;
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

    beforeEach(() => {
      minesweeper = new Minesweeper(assigner);
    });

    it('should show a sad face on game over', () => {
      render(<MinesweeperDisplay minesweeper={minesweeper} />);

      let happyFace = screen.getByTitle('happy-face');
      expect(happyFace).toBeTruthy();

      let mine = screen.getByTestId('0,1');

      fireEvent.click(mine);

      const sadFace = screen.getByTitle('sad-face');
      expect(sadFace).toBeTruthy();
    });
  });
});
