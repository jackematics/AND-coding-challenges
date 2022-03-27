import "./App.css";
import ConnectFourGrid from "./components/connect-four-grid/ConnectFourGrid";
import ConnectFour from "./game-engine/connect-four";

function App() {
  const connectFour = new ConnectFour();

  return (
    <div className="App">
      <header>
        <h1>Connect Four</h1>
      </header>
      <ConnectFourGrid game={connectFour} />
    </div>
  );
}

export default App;
