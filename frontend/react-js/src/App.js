import React from 'react';
import './App.css';
import { LandingPage } from './components';

function App() {
  const isLoggedIn = false;
  return (
    <div className="App">
      <LandingPage isLoggedIn={isLoggedIn}></LandingPage>
    </div>
  );
}

export default App;
