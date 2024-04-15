import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer';

function App() {
  const links = [
    { path: '/', title: 'Home' },
    { path: '/dashboard', title: 'Dashboard' },
    { path: 'https://restaked-app.gitbook.io/restaked.app-api-documentation', title: 'Documentation' },
  ]
  return (
    <div className="app-container">
    <Router>
      <div className="App">
        <Navbar links={links} />
        <Routes> 
          <Route path="/" element={<Home />} /> 
          <Route path="/dashboard" element={<Dashboard />} /> 
        </Routes>
        <Footer />
      </div>
    </Router>
    </div>
  );
}

export default App;
