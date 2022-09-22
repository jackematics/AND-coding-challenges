import './App.css';
import { ChessCheckerWrapper, PiecePickerWrapper } from './App.styles';
import ChessboardDisplay from './components/chessboard/ChessboardDisplay';
import PiecePicker from './components/piece-picker/PiecePicker';
import Chessboard from './engine/chessboard';
import PieceType from './enums/piece';

function App() {
  const chessboard = new Chessboard();
  return (
    <div className="App">
      <header>
        <h1>Chess Checker</h1>
        <ChessCheckerWrapper>
          <PiecePickerWrapper>
            <PiecePicker />
          </PiecePickerWrapper>
          <ChessboardDisplay
            chessboard={chessboard}
            selectedPieceMetadata={{
              src: '',
              alt: '',
              type: PieceType.Null,
              highlight: '',
            }}
          />
        </ChessCheckerWrapper>
      </header>
    </div>
  );
}

export default App;
