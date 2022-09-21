import './App.css';
import PiecePicker from './components/piece-picker/PiecePicker';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Chess Checker</h1>
        <PiecePicker />
      </header>
    </div>
  );
}

export default App;
