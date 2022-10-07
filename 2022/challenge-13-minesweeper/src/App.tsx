import './App.css';
import Minesweeper from './business-logic/minesweeper';
import MinesweeperDisplay from './components/minesweeper-display/MinesweeperDisplay';

function App() {
  const minesweeper = new Minesweeper({ rows: 9, cols: 9, mines: 10 });

  return (
    <div className="App">
      <header>
        <h1>Minesweeper</h1>
        <MinesweeperDisplay model={minesweeper} />
      </header>
    </div>
  );
}

export default App;
