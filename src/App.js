import React from 'react';
import Home from './components/Home/Home';
import GhService from './GhService';
import './App.css';

function App() {
  return (
    <div className="App">
      <Home service={GhService}/>
    </div>
  );
}

export default App;
