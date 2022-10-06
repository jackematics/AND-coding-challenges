import './App.css';
import MinesweeperDisplay from './components/minesweeper/MinesweeperDisplay';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Minesweeper</h1>
        <MinesweeperDisplay />
      </header>
    </div>
  );
}

export default App;
