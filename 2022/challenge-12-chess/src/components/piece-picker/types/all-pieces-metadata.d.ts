import PieceType from '../../../engine/pieces/enum/piece';

export type AllPiecesMetadata = {
  '': PieceMetadata;
  pawn: PieceMetadata;
  rook: PieceMetadata;
  knight: PieceMetadata;
  bishop: PieceMetadata;
  queen: PieceMetadata;
  king: PieceMetadata;
};

export type PieceMetadata = {
  src: string;
  alt: string;
  type: PieceType;
  highlight: string;
};
