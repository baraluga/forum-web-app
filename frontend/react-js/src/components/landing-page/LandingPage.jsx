import React, { useState, Fragment } from 'react';
import Login from '../login/Login';
import './LandingPage.css';
import Axios from 'axios';
import { endpoints } from '../../utils';

export const LandingPage = () => {
  // states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /** function that handles the login */
  const login = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await Axios.post(endpoints.user.login, {
        email,
        password,
      });
      setToken(data.token);
    } catch ({ response }) {
      setError(response.data.message);
    }
    setLoading(false);
  };

  return !!token ? (
    <div>hello, world</div>
  ) : (
    <Fragment>
      <Login
        handleLogin={login}
        setEmail={setEmail}
        setPassword={setPassword}
      ></Login>
      {/* TODO: Proper loading indicator and error reporting */}
      {loading && <text>loading...</text>}
      {error && <text>{error}</text>}
    </Fragment>
  );
};
