import { IErrorHandler } from "./Error";
import { IAuthentication } from "./Authentication";

export interface ILoginProps extends IErrorHandler, IAuthentication {
    onLoginSuccess: (result:ILoginResult) => void;
}

export interface ILoginState extends IAuthentication {
}

export interface ILoginResult {
    apiKey: string;
    id: number;
    username: string;
}
