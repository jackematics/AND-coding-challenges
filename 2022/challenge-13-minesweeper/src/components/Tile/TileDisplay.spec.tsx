import { fireEvent, render, screen } from '@testing-library/react';
import Tile from '../../business-logic/tile';
import TileType from '../../enums/tile-type';
import TileDisplay from './TileDisplay';

describe('TileDisplay', () => {
  it('should show an empty square if there are no surrounding mines', () => {
    const tile = new Tile(TileType.Empty, { row: 1, col: 1 });
    render(<TileDisplay tile={tile} />);

    let noSurroundingMines = screen.getByTestId('1,1');
    console.log(noSurroundingMines);

    fireEvent.click(noSurroundingMines);
    noSurroundingMines = screen.getByTestId('1,1');
    const style = window.getComputedStyle(noSurroundingMines);

    expect(noSurroundingMines.title).toBe('empty-tile');
    expect(style.backgroundColor).toBe('rgb(219, 219, 219)');
    expect(style.border).toBe('1px solid #575757');
  });
});
