import React from 'react';
import './Login.css';

const Login = ({ setEmail, setPassword, handleLogin }) => {
  return (
    <div>
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

export default Login;
