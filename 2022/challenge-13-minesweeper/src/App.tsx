import './App.css';
import GameAssigner from './business-rules/game-assigner';
import Minesweeper from './business-rules/minesweeper';
import MinesweeperDisplay from './components/minesweeper-display/MinesweeperDisplay';

function App() {
  const assigner = new GameAssigner({ rows: 9, cols: 9, mines: 10 });
  const minesweeper = new Minesweeper(assigner);

  return (
    <div className="App">
      <header>
        <h1>Minesweeper</h1>
        <MinesweeperDisplay minesweeper={minesweeper} />
      </header>
    </div>
  );
}

export default App;
