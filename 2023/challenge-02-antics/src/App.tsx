import { useState } from 'react';
import reactLogo from './assets/react.svg';
import LangtonsAntDisplay from './components/langtons-ant/LangtonsAntDisplay';

function App() {
  return (
    <>
      <h1 className="mb-10 text-center font-sans text-6xl font-bold">
        Langtons Ant
      </h1>
      <LangtonsAntDisplay />
    </>
  );
}

export default App;
