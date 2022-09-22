import { fireEvent, render, screen } from '@testing-library/react';
import PieceType from '../../enums/piece';
import PiecePicker from './PiecePicker';

describe('PiecePicker', () => {
  it.each([
    PieceType.Pawn,
    PieceType.Rook,
    PieceType.Knight,
    PieceType.Bishop,
    PieceType.Queen,
    PieceType.King,
  ])('should highlight %s when clicked', (pieceTag) => {
    render(<PiecePicker />);

    const piece = screen.getByAltText(pieceTag);
    let style = window.getComputedStyle(piece);
    expect(style.backgroundColor).toBe('');
    fireEvent.click(piece);
    style = window.getComputedStyle(piece);
    expect(style.backgroundColor).toBe('rgb(192, 192, 192)');
  });

  it('should unhighlight other pieces when a piece is clicked', () => {
    render(<PiecePicker />);
    const paleGreyRgb = 'rgb(192, 192, 192)';

    const pawn = screen.getByAltText(PieceType.Pawn);
    const rook = screen.getByAltText(PieceType.Rook);
    const bishop = screen.getByAltText(PieceType.Bishop);

    fireEvent.click(pawn);
    fireEvent.click(rook);

    const pawnStyle = window.getComputedStyle(pawn);
    let rookStyle = window.getComputedStyle(rook);

    expect(pawnStyle.backgroundColor).toBe('');
    expect(rookStyle.backgroundColor).toBe(paleGreyRgb);

    fireEvent.click(bishop);

    rookStyle = window.getComputedStyle(rook);
    const bishopStyle = window.getComputedStyle(bishop);

    expect(rookStyle.backgroundColor).toBe('');
    expect(bishopStyle.backgroundColor).toBe(paleGreyRgb);
  });
});
