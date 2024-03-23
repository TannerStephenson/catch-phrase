import React from 'react';
import Game from './game/Game.js';
import Navbar from './nav/Navbar.js';
import './App.css';


function App() {
  return (
    <div className="App">
      <Navbar />
      <div className ="GameContainer">
        <Game />
      </div>
    </div>
  );
}

export default App;
