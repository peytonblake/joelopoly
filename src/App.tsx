import './App.css';
import React from 'react';
import TitleScreen from './pages/titleScreen';
import ColorScreen from './pages/colorScreen'
import TurnScreen from './pages/turnScreen';
import DinoScreen from './pages/dinoPage';
import WhackAMoleScreen from './pages/WhackAMolePage';
import GuitarHeroScreen from './pages/GuitarHeroPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TitleScreen />} />
        <Route path="/color" element={<ColorScreen />} />
        <Route path="/turn" element={<TurnScreen />} />
        <Route path="/DinoGame" element={<DinoScreen />} />
        <Route path="/WhackAMole" element={<WhackAMoleScreen />} />
        <Route path="/GuitarHero" element={<GuitarHeroScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
