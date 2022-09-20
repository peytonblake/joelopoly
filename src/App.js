import './App.css';
import React from 'react';
import Title from './pages/title';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Title />} exact />
      </Routes>
    </Router>
  );
}

export default App;
