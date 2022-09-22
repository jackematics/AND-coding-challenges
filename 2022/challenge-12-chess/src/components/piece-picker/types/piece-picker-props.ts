import { PieceMetadata } from './all-pieces-metadata';

export type PiecePickerProps = {
  pieceMetadataCallback: (pieceMetadata: PieceMetadata) => void;
};
