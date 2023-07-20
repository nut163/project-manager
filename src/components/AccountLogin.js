import React, { useState } from 'react';
import axios from 'axios';

const AccountLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/login', { username, password });
      if (response.data.success) {
        // handle successful login here, like redirecting to dashboard
      } else {
        setLoginError(response.data.message);
      }
    } catch (error) {
      setLoginError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="account-login">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {loginError && <p className="error">{loginError}</p>}
    </div>
  );
};

export default AccountLogin;