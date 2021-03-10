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
import Spinner from 'react-spinkit';


function App() {
  const [user, loading] = useAuthState(auth);

  if(loading) {
    return (
      <AppLoading>
        <AppLoadingContainer>
            <img
              src='https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg'
              alt='Slack Logo'  
            />
            <Spinner 
              name="ball-spin-fade-loader" 
              color="black"
              fadeIn="none"
            />
        </AppLoadingContainer>
      </AppLoading>
    )
  }

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

const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;

const AppLoadingContainer = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > img {
    height: 100px;
    padding: 20px;
    margin-bottom: 40px;
  }
`;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;
