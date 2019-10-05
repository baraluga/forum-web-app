import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div>
      Email:{' '}
      <input type="text" onChange={({ target }) => setEmail(target.value)} />
      Password:{' '}
      <input
        type="password"
        onChange={({ target }) => setPassword(target.value)}
      />
      <button type="submit" onClick={handleLogin({ email, password })}>
        Login
      </button>
    </div>
  );
};

const handleLogin = ({ email, password }) => console.log({ email, password });

export default Login;
