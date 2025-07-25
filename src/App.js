import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavMenu from './components/NavMenu/NavMenu';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';
import LandingPage from './components/LandingPage/LandingPage';
import Patients from './components/Patients/Patients';
import Appointments from './components/Appointments/Appointments';
import HealthStats from './components/HealthStats/HealthStats';
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