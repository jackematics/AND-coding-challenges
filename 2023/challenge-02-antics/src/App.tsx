import { useState } from 'react';
import reactLogo from './assets/react.svg';
import LangtonsAntUi from './components/LangtonsAntUi';

function App() {
  return (
    <>
      <h1 className="mb-10 text-center font-sans text-6xl font-bold">
        Langtons Ant
      </h1>
      <LangtonsAntUi />
    </>
  );
}

export default App;
