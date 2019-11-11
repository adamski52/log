import { IAuthentication } from "./Authentication";
import { IStatusHandler } from "./Status";

export interface ILoginProps extends IStatusHandler, IAuthentication {
    onLoginSuccess: (result:ILoginResult) => void;
}

export interface ILoginState extends IAuthentication {
}

export interface ILoginResult {
    apiKey: string;
    id: number;
    username: string;
}
