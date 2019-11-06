import { IError } from "./Error";
import { IAuthentication } from "./Authentication";


export interface IAppProps {
}

export interface IAppState extends IAuthentication {
    error: IError;
}
