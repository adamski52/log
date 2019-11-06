import React, { FormEvent } from 'react';
import HttpService from '../services/Http';
import { ILoginProps, ILoginState } from '../interfaces/Login';
import { Redirect } from 'react-router';

export default class Login extends React.Component<ILoginProps, ILoginState> {
    private usernameRef:React.RefObject<HTMLInputElement> = React.createRef();
    private passwordRef:React.RefObject<HTMLInputElement> = React.createRef();

    constructor(props:ILoginProps) {
        super(props);
        this.state = {
            auth: props.auth
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    private async onSubmit(e:FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
        this.props.onClearError();
        
        if(!this.usernameRef.current || !this.usernameRef.current.value) {
            this.props.onError("Username is requireds.");
            return;
        }

        if(!this.passwordRef.current || !this.passwordRef.current.value) {
            this.props.onError("Password is required.");
            return;
        }

        try {
            let result = await HttpService.post("/api/user/login", {
                username: this.usernameRef.current.value,
                password: this.passwordRef.current.value
            });

            this.props.onLoginSuccess(result);
        }
        catch(e) {
            this.props.onError("Invalid username/password.");
            return;
        }        
    }

    public static getDerivedStateFromProps(props:ILoginProps, state:ILoginState) {
        return {
            auth: props.auth
        };
    }

    public render() {
        if(this.state.auth.isAuthenticated) {
            return (
                <Redirect to="/diary" />
            );
        }

        return (
            <div className="login-wrapper row justify-content-center">
                <div className="col-4">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <input className="form-control" id="username" type="text" ref={this.usernameRef} />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input className="form-control" type="password" ref={this.passwordRef} />
                        </div>
                        <button className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        );
    }
}

