import { useState } from 'react';
import './App.css';
import { ChessCheckerWrapper, PiecePickerWrapper } from './App.styles';
import ChessboardDisplay from './components/chessboard/ChessboardDisplay';
import PiecePicker from './components/piece-picker/PiecePicker';
import { PieceMetadata } from './components/piece-picker/types/all-pieces-metadata';
import Chessboard from './engine/chessboard';
import PieceType from './engine/pieces/enum/piece';

function App() {
  const chessboard = new Chessboard();
  const [selectedPieceMetadata, setSelectedPieceMetadata] =
    useState<PieceMetadata>({
      src: '',
      alt: '',
      type: PieceType.Null,
      highlight: '',
    });

  const pieceMetadataCallback = (pieceMetadata: PieceMetadata): void => {
    setSelectedPieceMetadata(pieceMetadata);
  };

  return (
    <div className="App">
      <header>
        <h1>Chess Checker</h1>
        <ChessCheckerWrapper>
          <PiecePickerWrapper>
            <PiecePicker pieceMetadataCallback={pieceMetadataCallback} />
          </PiecePickerWrapper>
          <ChessboardDisplay
            chessboard={chessboard}
            selectedPieceMetadata={selectedPieceMetadata}
          />
        </ChessCheckerWrapper>
      </header>
    </div>
  );
}

export default App;
