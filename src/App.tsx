import React from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import Navigation from './Components/Navigation';
import Create from './Components/Users/Create/Create';
import View from './Components/Users/View';
import './App.css';

function App() {
  return (
    
       
    <Router>
      <Navigation/>   
    <Routes>
    


      <Route  path="/users/view" element={<View/>} />
      <Route  path="/users/create" element={<Create/>} />
      <Route  path="/" element={<Navigate to="/users/create"/>} />

     
    </Routes>
  </Router>
  );
}

export default App;
