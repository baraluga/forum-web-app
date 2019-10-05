import './LandingPage.css';
import Login from '../login/Login';
import React from 'react';

export const LandingPage = ({ isLoggedIn }) => {
  return !!isLoggedIn ? <div>hello, world</div> : <Login></Login>;
};
