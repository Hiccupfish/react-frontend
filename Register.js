import React, { useState } from 'react';
import './Register.css';

function Register() {
  const [form, setForm] = useState({
    Username: '',
    FullName: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
    Role: 'User',
  });
  const [error, setError] = useState(null);
  const [passwordMismatch, setPasswordMismatch] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setPasswordMismatch(null);
    if (form.Password !== form.ConfirmPassword) {
      setPasswordMismatch('Passwords do not match.');
      return;
    }
    try {
      const response = await fetch('/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        // Handle successful registration, e.g., redirect to login
        console.log('Registered successfully');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Registration failed.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="content-box">
      <h3>Register</h3>
      <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="Username"
            className="form-control"
            value={form.Username}
            onChange={handleChange}
            required
            minLength={3}
          />
        </div>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            name="FullName"
            className="form-control"
            value={form.FullName}
            onChange={handleChange}
            required
            minLength={2}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="Email"
            type="email"
            className="form-control"
            value={form.Email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="Password"
              type="password"
              className="form-control"
              value={form.Password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="ConfirmPassword"
              type="password"
              className="form-control"
              value={form.ConfirmPassword}
              onChange={handleChange}
              required
            />
            {passwordMismatch && <div className="text-danger">{passwordMismatch}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="Role"
              className="form-control"
              value={form.Role}
              onChange={handleChange}
              required
            >
              <option value="User">User</option>
              <option value="Healthcare">Healthcare Professional</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Register</button>
        </div>
      </form>
    </div>
  );
}

export default Register; 