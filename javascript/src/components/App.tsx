import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Login from './Login';
import { IAppProps, IAppState } from '../interfaces/App';
import Diary from './Diary';
import DiaryEntryForm from './DiaryEntryForm';
import StatusBanner from './StatusBanner';
import UtilService from '../services/Util';

export default class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = {
      status: {
        message: "",
        type: ""
      }
    };

    this.showStatus = this.showStatus.bind(this);
    this.clearStatus = this.clearStatus.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  private handleRedirect(to:string) {
    this.setState({
      redirectTo: to
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

  private handleRedirects() {
    if(!UtilService.isAuthenticated()) {
      return (
          <Redirect to="/" />
      );
    }

    if(this.state.redirectTo) {
      return (
        <Redirect to={this.state.redirectTo} />
      );
    }

    return null;
  }

  public render() {
    return (
      <div className="container-fluid app-wrapper">
      <Router>
        {this.handleRedirects()}
        <StatusBanner status={this.state.status} />
        <Switch>
          <Route exact path="/">
            <Login onRedirect={this.handleRedirect} showStatus={this.showStatus} />
          </Route>
          <Route exact path="/diary">
            <Diary onRedirect={this.handleRedirect} showStatus={this.showStatus} />
          </Route>
          <Route exact path="/diary/edit/:id" render={(props) => {
            return (
              <DiaryEntryForm onRedirect={this.handleRedirect} showStatus={this.showStatus} {...props} />
            );
          }}>
          </Route>
          <Route exact path="/diary/create">
            <DiaryEntryForm onRedirect={this.handleRedirect} showStatus={this.showStatus} />
          </Route>
        </Switch>
      </Router>
      </div>
    );
  }
}

