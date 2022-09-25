import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Player } from './features/player/Player';

function App() {
  return (
    <div className="App">
      <Player />
    </div>
  );
}

export default App;
