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
    this.onRedirect = this.onRedirect.bind(this);
  }

  private onRedirect(to:string) {
    this.setState({
      redirectTo: to
    }, () => {
      this.setState({
        redirectTo: ""
      });
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

  private handleRedirect() {
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
          <StatusBanner status={this.state.status} />
          <Switch>
            <Route exact path="/" render={(props) => {
              return (
                <Login onRedirect={this.onRedirect} showStatus={this.showStatus} {...props} />
              );
            }} />
            <Route exact path="/diary" render={(props) => {
              return (
                <Diary onRedirect={this.onRedirect} showStatus={this.showStatus} {...props} />
              );
            }} />
            <Route exact path="/diary/edit/:id" render={(props) => {
              return (
                <DiaryEntryForm onRedirect={this.onRedirect} showStatus={this.showStatus} {...props} />
              );
            }} />
            <Route exact path="/diary/create" render={(props) => {
              return (
                <DiaryEntryForm onRedirect={this.onRedirect} showStatus={this.showStatus} />
              );
            }} />
            {this.handleRedirect()}
          </Switch>
        </Router>
      </div>
    );
  }
}

