import Chessboard from '../../../engine/chessboard';
import { PieceMetadata } from '../../piece-picker/types/all-pieces-metadata';

export type ChessboardProps = {
  selectedPieceMetadata: PieceMetadata;
  chessboard: Chessboard;
};
