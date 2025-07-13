import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavMenu.css';

function NavMenu() {
  return (
    <nav className="nav-container">
      <div className="nav-box">
        <h2>CTRL Navigation</h2>
        <ul className="nav-list">
          <li><NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink></li>
          <li><NavLink to="/register" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Register</NavLink></li>
          <li><NavLink to="/login" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Login</NavLink></li>
          <li><NavLink to="/patients" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Patients</NavLink></li>
          <li><NavLink to="/appointments" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Appointments</NavLink></li>
          <li><NavLink to="/healthstats" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Health Stats</NavLink></li>
        </ul>
      </div>
    </nav>
  );
}

export default NavMenu; 