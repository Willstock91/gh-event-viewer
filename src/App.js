import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import GhService from './GhService';
import './App.css';
import MyNav from './components/MyNav/MyNav';

function App() {
  return (
    <Router>
      <MyNav service={GhService}/>
    </Router>
    
  );
}

export default App;
