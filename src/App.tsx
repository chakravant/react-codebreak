import { useAtomValue } from 'jotai';
import React from 'react';
import './App.css';
import Game from './comps/Game';
import Setup from './comps/Setup';
import { screen } from './store/store';

function App() {
  const screenName = useAtomValue(screen);
  return (
    <div className="App">
      { screenName === 'SETUP' ? <Setup/> : <Game/> }
    </div>
  );
}

export default App;
