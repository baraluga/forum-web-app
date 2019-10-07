import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Switch } from 'react-router-dom';
import './App.css';
import { RestoringSessionPage } from './components';
import { privateRouteToTopics, routeToLandingPage, routeToNotFound, routeToRegistration } from './routes/routes';
import { endpoints } from './utils';

function App() {
  const tokenKey = 'token';
  // states
  const [token, setToken] = useState(localStorage.getItem(tokenKey));
  const [loading, setLoading] = useState(false);

  // effect to validateToken first
  useEffect(() => {
    setLoading(true);
    Axios.post(endpoints.user.validate, {
      token: localStorage.getItem(tokenKey),
    })
      .then(_ => null)
      .catch(_ => setToken(''))
      .finally(_ => setLoading(false));
  }, []);

  // effect to store the new token to the localStorage
  useEffect(() => {
    localStorage.setItem(tokenKey, token);
  }, [token]);

  return !!loading ? (
    <RestoringSessionPage />
  ) : (
    <div className="App">
      <Switch>
        {routeToLandingPage(token, setToken)}
        {routeToRegistration(setToken)}
        {privateRouteToTopics(token)}

        {/* 404 */}
        {routeToNotFound()}
      </Switch>
    </div>
  );
}

export default App;
