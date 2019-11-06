import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './Login';
import { IAppProps, IAppState } from '../interfaces/App';
import ErrorBanner from './ErrorBanner';
import Diary from './Diary';
import { ILoginResult } from '../interfaces/Login';

export default class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = {
      auth: {
        isAuthenticated: false,
        apiKey: ""
      },
      error: {
        message: ""
      }
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onError = this.onError.bind(this);
    this.onClearError = this.onClearError.bind(this);
  }

  private onLoginSuccess(result: ILoginResult) {
    this.onClearError();

    console.log(result);

    this.setState({
      auth: {
        isAuthenticated: true,
        apiKey: result.apiKey
      }
    });
  }

  private onError(message: string) {
    this.setState({
      error: {
        message: message
      }
    });
  }

  private onClearError() {
    this.setState({
      error: {
        message: ""
      }
    });
  }

  public render() {
    return (
      <div className="container-fluid app-wrapper">
      <Router>
        <ErrorBanner error={this.state.error} />
        <Switch>
          <Route exact path="/">
            <Login onLoginSuccess={this.onLoginSuccess} onError={this.onError} onClearError={this.onClearError} auth={this.state.auth} />
          </Route>
          <Route path="/diary">
            <Diary onError={this.onError} onClearError={this.onClearError} auth={this.state.auth} />
          </Route>
        </Switch>
      </Router>
      </div>
    );
  }
}

