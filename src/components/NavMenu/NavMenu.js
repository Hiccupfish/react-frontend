import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Home, UserPlus, LogIn, Users, Calendar, Activity, Moon, Sun } from 'lucide-react';
import './NavMenu.css';

function NavMenu({ toggleTheme, theme }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/register', label: 'Register', icon: UserPlus },
    { to: '/login', label: 'Login', icon: LogIn },
    { to: '/patients', label: 'Patients', icon: Users },
    { to: '/appointments', label: 'Appointments', icon: Calendar },
    { to: '/healthstats', label: 'Health Stats', icon: Activity }
  ];

  return (
    <nav className="nav-container">
      <div className="nav-wrapper">
        {/* Logo/Brand */}
        <div className="nav-brand">
          <div className="brand-icon">
            <Activity className="w-8 h-8" />
          </div>
          <h1 className="brand-text">CTRL</h1>
        </div>

        {/* Desktop Navigation */}
        <ul className="nav-list desktop-nav">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <li key={item.to}>
                <NavLink 
                  to={item.to} 
                  className={({ isActive }) => 
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                >
                  <IconComponent className="nav-icon" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>

        {/* Theme Toggle Button */}
        <button onClick={toggleTheme} className="theme-toggle-btn">
          {theme === 'light' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
          <span className="theme-toggle-text">{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
        </button>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Navigation */}
        <div className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
          <ul className="nav-list mobile-nav-list">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <li key={item.to}>
                  <NavLink 
                    to={item.to} 
                    className={({ isActive }) => 
                      `nav-link mobile-nav-link ${isActive ? 'active' : ''}`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <IconComponent className="nav-icon" />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavMenu; 