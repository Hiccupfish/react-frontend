import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavMenu from './NavMenu';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import LandingPage from './LandingPage';
import Patients from './Patients';
import Appointments from './Appointments';
import HealthStats from './HealthStats';
import './App.css';

function App() {
  return (
    <div className="App">
      <NavMenu />
      <div className="content-container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/healthstats" element={<HealthStats />} />
        </Routes>
      </div>
    </div>
  );
}

export default App; 