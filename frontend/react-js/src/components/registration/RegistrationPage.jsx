import React, { useState } from 'react';
import Axios from 'axios';
import { endpoints } from '../../utils';

export const RegistrationPage = ({ setToken }) => {
  const initialState = { name: '', email: '', password: '' };
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = () => {
    setLoading(true);
    setError('');
    Axios.post(endpoints.user.register, { ...form })
      .then(({ data }) => setToken(data.token))
      .catch(({ response }) => setError(response.data.message))
      .finally(_ => setLoading(false));
  };

  return (
    <div>
      Full Name:{' '}
      <input
        type="text"
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
      Email:{' '}
      <input
        type="text"
        onChange={e => setForm({ ...form, email: e.target.value })}
      />
      Password:{' '}
      <input
        type="password"
        onChange={e => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit" onClick={handleRegister}>
        Register
      </button>
      {(loading && <div>registering...</div>) || (error && <div>{error}</div>)}
    </div>
  );
};
