export type AllPiecesMetadata = {
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
  highlight: string;
};
