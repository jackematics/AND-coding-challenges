import { fireEvent, render, screen } from '@testing-library/react';
import GameAssigner from '../business-rules/game-assigner';
import Minesweeper from '../business-rules/minesweeper';
import Tile from '../business-rules/tile';
import Game from '../components/game/Game';
import MinesweeperDisplay from '../components/minesweeper-display/MinesweeperDisplay';
import Difficulty from '../enums/difficulty';
import TileType from '../enums/tile-type';
import TestHelper from './test-helper';

describe('MinesweeperDisplay', () => {
  it('should render the initial minesweeper display as a grid of 9 x 9 tiles', () => {
    const assigner = new GameAssigner({ rows: 9, cols: 9, mines: 10 });
    const minesweeper = new Minesweeper(assigner);
    render(
      <MinesweeperDisplay
        minesweeper={minesweeper}
        difficulty={Difficulty.Beginner}
      />
    );

    const tiles = screen.getAllByTitle('hidden-tile');

    expect(tiles.length).toBe(81);
  });

  it('should reset the game when the face is clicked', () => {
    const assigner = TestHelper.checkResetAssigner;
    const minesweeper = new Minesweeper(assigner);
    render(
      <MinesweeperDisplay
        minesweeper={minesweeper}
        difficulty={Difficulty.Beginner}
      />
    );

    const tile = screen.getByTestId('0,0');

    fireEvent.click(tile);

    const face = screen.getByTitle('happy-face');
    fireEvent.click(face);

    const refreshedTiles = screen.getAllByTitle('hidden-tile');

    expect(refreshedTiles.length).toBe(6);
  });

  describe('when an empty square with no surrounding minds is clicked', () => {
    let minesweeper: Minesweeper;
    const assigner = TestHelper.checkEmptySquareAssigner;

    beforeEach(() => {
      minesweeper = new Minesweeper(assigner);
    });

    it('should show an empty square', () => {
      render(
        <MinesweeperDisplay
          minesweeper={minesweeper}
          difficulty={Difficulty.Beginner}
        />
      );

      let noSurroundingMines = screen.getByTestId('1,1');

      fireEvent.click(noSurroundingMines);
      const revealedTile = screen.getByTestId('1,1');

      expect(revealedTile.title).toBe('0-tile');
    });

    it('should reveal all squares around the empty tile and subsequent empty tiles revealed', () => {
      render(
        <MinesweeperDisplay
          minesweeper={minesweeper}
          difficulty={Difficulty.Beginner}
        />
      );

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
      render(
        <MinesweeperDisplay
          minesweeper={minesweeper}
          difficulty={Difficulty.Beginner}
        />
      );

      let oneSurroundingMine = screen.getByTestId('1,1');

      fireEvent.click(oneSurroundingMine);
      const revealedTile = screen.getByTestId('1,1');

      expect(revealedTile.title).toBe(tileTitle);
    }
  );

  describe('When a mine is clicked', () => {
    let minesweeper: Minesweeper;
    const assigner = TestHelper.checkMineSquareAssigner;

    beforeEach(() => {
      minesweeper = new Minesweeper(assigner);
    });

    it('should show a mine', () => {
      render(
        <MinesweeperDisplay
          minesweeper={minesweeper}
          difficulty={Difficulty.Beginner}
        />
      );
      let mine = screen.getByTestId('1,1');
      fireEvent.click(mine);
      mine = screen.getByTestId('1,1');
      expect(mine.title).toBe('red-mine-tile');
    });

    it('should reveal all other mines on screen', () => {
      render(
        <MinesweeperDisplay
          minesweeper={minesweeper}
          difficulty={Difficulty.Beginner}
        />
      );

      let mine = screen.getByTestId('1,1');
      fireEvent.click(mine);
      const allOtherMines = screen.getAllByTitle('mine-tile');
      expect(allOtherMines.length).toBe(3);
    });

    it('should make all other tiles unclickable', () => {
      render(
        <MinesweeperDisplay
          minesweeper={minesweeper}
          difficulty={Difficulty.Beginner}
        />
      );

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
      const assigner = TestHelper.simpleAssigner;

      const minesweeper = new Minesweeper(assigner);

      render(
        <MinesweeperDisplay
          minesweeper={minesweeper}
          difficulty={Difficulty.Beginner}
        />
      );

      const hiddenTile = screen.getByTestId('0,1');
      fireEvent.contextMenu(hiddenTile);

      const flaggedTile = screen.getByTestId('0,1');

      expect(flaggedTile.title).toBe('flagged-tile');
    });
  });

  describe('On game over', () => {
    let minesweeper: Minesweeper;
    const assigner = TestHelper.simpleAssigner;

    beforeEach(() => {
      minesweeper = new Minesweeper(assigner);
    });

    it('should show a sad face', () => {
      render(
        <MinesweeperDisplay
          minesweeper={minesweeper}
          difficulty={Difficulty.Beginner}
        />
      );

      let happyFace = screen.getByTitle('happy-face');
      expect(happyFace).toBeTruthy();

      let mine = screen.getByTestId('0,1');

      fireEvent.click(mine);

      const sadFace = screen.getByTitle('sad-face');
      expect(sadFace).toBeTruthy();
    });
  });

  describe('On a game win, where every hidden tile is uncovered except mine tiles', () => {
    let minesweeper: Minesweeper;
    const assigner = TestHelper.simpleAssigner;

    beforeEach(() => {
      minesweeper = new Minesweeper(assigner);
    });

    it('should show a sunglasses face', () => {
      render(
        <MinesweeperDisplay
          minesweeper={minesweeper}
          difficulty={Difficulty.Beginner}
        />
      );

      let emptyA = screen.getByTestId('0,0');
      let emptyB = screen.getByTestId('0,2');

      fireEvent.click(emptyA);
      fireEvent.click(emptyB);

      const sunglassesFace = screen.getByTitle('sunglasses-face');
      expect(sunglassesFace).toBeTruthy();
    });
  });

  describe('When selecting difficulty', () => {
    it('should initialise a beginner difficulty game when beginner is selected', () => {
      render(<Game />);

      const beginner = screen.getByTitle('beginner');
      fireEvent.click(beginner);
      const tiles = screen.getAllByTitle('hidden-tile');

      expect(tiles.length).toBe(81);
    });

    it('should initialise an intermediate difficulty game when intermediate is selected', () => {
      render(<Game />);

      const intermediate = screen.getByTitle('intermediate');
      fireEvent.click(intermediate);
      const tiles = screen.getAllByTitle('hidden-tile');

      expect(tiles.length).toBe(256);
    });

    it('should initialise an expert difficulty game when expert is selected', () => {
      render(<Game />);

      const expert = screen.getByTitle('expert');
      fireEvent.click(expert);
      const tiles = screen.getAllByTitle('hidden-tile');

      expect(tiles.length).toBe(480);
    });
  });
});
