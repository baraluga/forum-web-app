import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {
  LandingPage,
  NotFoundPage,
  RegistrationPage,
  Topics,
} from '../components';

const PrivateRoute = ({
  authenticated,
  component: Component,
  componentProps,
  ...rest
}) => (
  <Route
    {...rest}
    render={() =>
      !!authenticated ? (
        <Component {...componentProps} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

export const routeToLandingPage = (token, setTokenFn) =>
  ['/', '/login'].map(path => (
    <Route
      key={path}
      exact
      path={path}
      render={() => <LandingPage token={token} setToken={setTokenFn} />}
    />
  ));

export const routeToRegistration = setTokenFn => (
  <Route
    exact
    path="/register"
    render={() => <RegistrationPage setToken={setTokenFn} />}
  />
);

export const routeToTopics = token => (
  <Route exact path="/topics" render={() => <Topics token={token} />} />
);

export const privateRouteToTopics = token => (
  <PrivateRoute
    path="/topics"
    authenticated={token}
    component={Topics}
    componentProps={{ token }}
  />
);

export const routeToNotFound = () => <Route component={NotFoundPage} />;
