import React, { FormEvent } from 'react';
import HttpService from '../services/Http';
import { ILoginProps, ILoginState } from '../interfaces/Login';

export default class Login extends React.Component<ILoginProps, ILoginState> {
    private usernameRef:React.RefObject<HTMLInputElement> = React.createRef();
    private passwordRef:React.RefObject<HTMLInputElement> = React.createRef();

    constructor(props:ILoginProps) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    private async onSubmit(e:FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if(!this.usernameRef.current || !this.usernameRef.current.value) {
            this.setState({
                error: {
                    message: "Username is required."
                }
            });
            return;
        }

        if(!this.passwordRef.current || !this.passwordRef.current.value) {
            this.setState({
                error: {
                    message: "Password is required."
                }
            });
            return;
        }

        try {
            let result = await HttpService.post("/api/user/login", {
                username: this.usernameRef.current.value,
                password: this.passwordRef.current.value
            });
            console.log(result);
        }
        catch(e) {
            this.setState({
                error: {
                    message: "Invalid username/password."
                }
            });
            return;
        }
        
    }

    public render() {
        return (
            <form onSubmit={this.onSubmit}>
                <label>
                    <span>Username</span>
                    <input type="text" ref={this.usernameRef} />
                </label>
                <label>
                    <span>Password</span>
                    <input type="password" ref={this.passwordRef} />
                </label>
                <button>Login</button>
            </form>
        );
    }
}

