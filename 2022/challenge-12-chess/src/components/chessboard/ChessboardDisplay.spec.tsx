import { fireEvent, render, screen } from '@testing-library/react';
import Chessboard from '../../engine/chessboard';
import PieceType from '../../engine/pieces/enum/piece';
import ChessboardDisplay from './ChessboardDisplay';
import TileColour from './tile-colour';

describe('ChessboardDisplay', () => {
  it.each([
    {
      src: '/assets/pawn-white.png',
      alt: PieceType.Pawn,
      type: PieceType.Pawn,
      highlight: '',
    },
    {
      src: '/assets/rook-white.png',
      alt: PieceType.Rook,
      type: PieceType.Rook,
      highlight: '',
    },
    {
      src: '/assets/knight-white.png',
      alt: PieceType.Knight,
      type: PieceType.Knight,
      highlight: '',
    },
    {
      src: '/assets/bishop-white.png',
      alt: PieceType.Bishop,
      type: PieceType.Bishop,
      highlight: '',
    },
    {
      src: '/assets/queen-white.png',
      alt: PieceType.Queen,
      type: PieceType.Queen,
      highlight: '',
    },
    {
      src: '/assets/king-white.png',
      alt: PieceType.King,
      type: PieceType.King,
      highlight: '',
    },
  ])(
    'should set all tiles to null piece and set selected tile as containing a %s when tile is clicked',
    (piece) => {
      render(
        <ChessboardDisplay
          chessboard={new Chessboard()}
          selectedPieceMetadata={{
            src: piece.src,
            alt: piece.alt,
            type: piece.type,
            highlight: '',
          }}
        />
      );

      const tile = screen.getByTitle('A2');
      fireEvent.click(tile);

      const displayedPiece = screen.getByAltText(piece.alt);

      expect(displayedPiece).toBeTruthy();
    }
  );

  it('should highlight two spaces in front of a pawn green on row 2', () => {
    render(
      <ChessboardDisplay
        chessboard={new Chessboard()}
        selectedPieceMetadata={{
          src: '/assets/pawn-white.png',
          alt: PieceType.Pawn,
          type: PieceType.Pawn,
          highlight: '',
        }}
      />
    );

    const selectedTile = screen.getByTitle('A2');
    fireEvent.click(selectedTile);

    const greenTile1 = screen.getByTitle('A3');
    const greenTile2 = screen.getByTitle('A4');

    const greenTile1Style = window.getComputedStyle(greenTile1);
    const greenTile2Style = window.getComputedStyle(greenTile2);

    expect(greenTile1Style.backgroundColor).toBe(TileColour.Green);
    expect(greenTile2Style.backgroundColor).toBe(TileColour.Green);
  });
});
