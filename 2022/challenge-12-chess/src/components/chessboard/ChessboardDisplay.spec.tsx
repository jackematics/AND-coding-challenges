import { fireEvent, render, screen } from '@testing-library/react';
import Chessboard from '../../engine/chessboard';
import PieceType from '../../enums/piece';
import ChessboardDisplay from './ChessboardDisplay';

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
});
