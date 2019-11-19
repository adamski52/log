import React, { FormEvent } from 'react';
import HttpService from '../services/Http';
import { ILoginProps, ILoginState } from '../interfaces/Login';
import UtilService from '../services/Util';
import Cookie from "js-cookie";

export default class Login extends React.Component<ILoginProps, ILoginState> {
    private usernameRef:React.RefObject<HTMLInputElement> = React.createRef();
    private passwordRef:React.RefObject<HTMLInputElement> = React.createRef();

    constructor(props:ILoginProps) {
        super(props);

        this.state = {};
        
        this.onSubmit = this.onSubmit.bind(this);
    }

    private async onSubmit(e:FormEvent<HTMLFormElement>) {
        e.preventDefault();
                
        if(!this.usernameRef.current || !this.usernameRef.current.value) {
            this.props.showStatus("Username is requireds.", UtilService.STATUS_ERROR);
            return;
        }

        if(!this.passwordRef.current || !this.passwordRef.current.value) {
            this.props.showStatus("Password is required.", UtilService.STATUS_ERROR);
            return;
        }

        try {
            let result = await HttpService.post("/api/user/login", {
                username: this.usernameRef.current.value,
                password: this.passwordRef.current.value
            });

            Cookie.set("X-API-KEY", result.apiKey);
            this.props.history.push("/diary");
        }
        catch(e) {
            this.props.showStatus("Invalid username/password.", UtilService.STATUS_ERROR);
            return;
        }        
    }

    public render() {
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

