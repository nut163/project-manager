import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AccountManagement = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data from API
    axios.get('/api/user')
      .then(res => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();

    // Update user data
    axios.put('/api/user', user)
      .then(res => {
        alert('Account updated successfully');
      })
      .catch(err => console.error(err));
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="account-management">
      <h2>Account Management</h2>
      <form onSubmit={handleUpdate}>
        <label>
          Username:
          <input type="text" name="username" value={user.username} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={user.email} onChange={handleChange} />
        </label>
        <label>
          Password:
          <input type="password" name="password" onChange={handleChange} />
        </label>
        <label>
          Profile Image:
          <input type="text" name="profileImage" value={user.profileImage} onChange={handleChange} />
        </label>
        <label>
          Billing Information:
          <textarea name="billingInfo" value={user.billingInfo} onChange={handleChange} />
        </label>
        <button type="submit">Update Account</button>
      </form>
    </div>
  );
};

export default AccountManagement;