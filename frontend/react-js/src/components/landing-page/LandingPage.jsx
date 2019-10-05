import Axios from 'axios';
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { endpoints } from '../../utils';
import { Login } from '../login/Login';
import './LandingPage.css';

export const LandingPage = ({ token, setToken }) => {
  // states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    <Redirect to="/topics"></Redirect>
  ) : (
    // Login / Register Page
    <div>
      <Login
        handleLogin={login}
        setEmail={setEmail}
        setPassword={setPassword}
      ></Login>
      {/* TODO: Proper loading indicator and error reporting */}
      {loading && <pre>loading...</pre>}
      {error && <pre>{error}</pre>}
      <pre>
        Don't have an account yet? Register <Link to="/register">here</Link>
      </pre>
    </div>
  );
};
