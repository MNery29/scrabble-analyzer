import logo from './logo.svg';
import './App.css';
import React from 'react';
import Board from './components/Board';
import TileSource from './components/TileSource';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Board />
        <TileSource />
      </header>
    </div>
  );
}

export default App;
