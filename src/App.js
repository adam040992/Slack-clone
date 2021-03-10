import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from 'styled-components';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import Login from './components/Login';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';


function App() {
  const [user, loading] = useAuthState(auth);

  return (
    <div className="app">

    <Router>
      {!user ? (
        <Login />
      ) : (
        <>
      <Header />
      <AppBody>
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <Chat />
          </Route>
        </Switch>
      </AppBody>
      </>
      )}
    </Router>

    </div>
  );
}

export default App;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;
