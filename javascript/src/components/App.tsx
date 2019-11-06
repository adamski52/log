import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from './Login';

export default class App extends React.Component {
  public render() {
    return (
      <Router>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/diary">
              {/* <Diary /> */}
            </Route>
          </Switch>
      </Router>
    );
  }
}

