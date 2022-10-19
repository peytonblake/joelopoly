import './App.css';
import React from 'react';
import TitleScreen from './pages/titleScreen';
import ColorScreen from './pages/colorScreen'
import TurnScreen from './pages/turnScreen';
import GameScreen from './pages/gameScreen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TitleScreen />} />
        <Route path="/color" element={<ColorScreen />} />
        <Route path="/turn" element={<TurnScreen />} />
        <Route path="/game" element={<GameScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
