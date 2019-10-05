import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import {
  LandingPage,
  NotFoundPage,
  RegistrationPage,
  RestoringSessionPage,
  Topics,
} from './components';
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
        <Route
          exact
          path="/login"
          render={() => <LandingPage token={token} setToken={setToken} />}
        />
        <Route
          exact
          path="/register"
          render={() => <RegistrationPage setToken={setToken} />}
        />
        <Route exact path="/topics" render={() => <Topics token={token} />} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default App;
