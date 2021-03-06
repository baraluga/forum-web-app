import React from 'react';
import './Login.css';

export const Login = ({ setEmail, setPassword, handleLogin }) => {
  return (
    <div className="login">
      Email:{' '}
      <input type="text" onChange={({ target }) => setEmail(target.value)} />
      Password:{' '}
      <input
        type="password"
        onChange={({ target }) => setPassword(target.value)}
      />
      <button type="submit" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};
