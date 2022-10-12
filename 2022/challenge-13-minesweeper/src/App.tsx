import './App.css';
import Game from './components/game/Game';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Minesweeper</h1>
        <Game />
      </header>
    </div>
  );
}

export default App;
