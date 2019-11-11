import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './Login';
import { IAppProps, IAppState } from '../interfaces/App';
import Diary from './Diary';
import DiaryEntryForm from './DiaryEntryForm';
import { ILoginResult } from '../interfaces/Login';
import StatusBanner from './StatusBanner';

export default class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = {
      auth: {
        isAuthenticated: false,
        apiKey: ""
      },
      status: {
        message: "",
        type: ""
      }
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.showStatus = this.showStatus.bind(this);
    this.clearStatus = this.clearStatus.bind(this);
  }

  private onLoginSuccess(result: ILoginResult) {
    this.setState({
      auth: {
        isAuthenticated: true,
        apiKey: result.apiKey
      }
    });
  }

  private showStatus(message: string, type:string) {
    this.setState({
      status: {
        message: message,
        type: type
      }
    }, () => {
      setTimeout(() => {
        this.clearStatus();
      }, 2000);
    });
  }

  private clearStatus() {
    this.setState({
      status: {
        message: "",
        type: ""
      }
    });
  }

  public render() {
    return (
      <div className="container-fluid app-wrapper">
      <Router>
        <StatusBanner status={this.state.status} />
        <Switch>
          <Route exact path="/">
            <Login onLoginSuccess={this.onLoginSuccess} showStatus={this.showStatus} auth={this.state.auth} />
          </Route>
          <Route exact path="/diary">
            <Diary showStatus={this.showStatus} auth={this.state.auth} />
          </Route>
          <Route exact path="/diary/edit/:id" render={(props) => {
            return (
              <DiaryEntryForm showStatus={this.showStatus} auth={this.state.auth} {...props} />
            );
          }}>
          </Route>
          <Route exact path="/diary/create">
            <DiaryEntryForm showStatus={this.showStatus} auth={this.state.auth} />
          </Route>
        </Switch>
      </Router>
      </div>
    );
  }
}

