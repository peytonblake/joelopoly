import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import transportations from './game/transportations';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <>
    {transportations}
    <App />
    </>
  </React.StrictMode>
);
