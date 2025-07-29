import React, { useEffect, useState } from 'react';
import './Profile.css';

const updateUserProfile = async (user) => {
  try {
        const response = await fetch('https://ctrlapiapp.azurewebsites.net/api/user/update-email', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.Email }),
    });
    return response.ok;
  } catch (error) {
    return false;
  }
};

function Profile() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [form, setForm] = useState({ FullName: '', Email: '' });

  useEffect(() => {
    // In a real app, you'd get the user from auth context
    setUser({ Username: 'johndoe', Email: 'john@example.com' });
    setForm({ Email: 'john@example.com' });
    setIsLoading(false);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    const updatedUser = { ...user, ...form };
    const result = await updateUserProfile(updatedUser);
    if (!result) {
      setErrorMessage('Failed to update profile.');
    } else {
      setUser(updatedUser);
    }
  };

  if (isLoading) return <p>Loading profile...</p>;
  if (errorMessage) return <div className="alert alert-danger">{errorMessage}</div>;
  if (!user) return null;

  return (
    <div className="content-box">
      <h2>User Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input className="form-control" value={user.Username} disabled />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            className="form-control"
            name="Email"
            type="email"
            value={form.Email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
}

export default Profile; 