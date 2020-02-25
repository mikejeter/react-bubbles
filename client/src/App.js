import React from "react";
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import BubblePage from './components/BubblePage';

import Login from "./components/Login";
import "./styles.scss";

const AppStyles = styled.div`

margin: 0 auto;
background: #FFFFFF;
height: 100vh;

`;

function App() {
  return (
    <AppStyles>
    <Router>
      <div className="App">
      <Switch>
      <Route exact path="/" component={Login} />
      <PrivateRoute path='/bubbles' component={BubblePage} />
      </Switch>
      </div>
    </Router>
    </AppStyles>
  );
}

export default App;