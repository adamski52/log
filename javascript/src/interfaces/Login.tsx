import { IStatusHandler } from "./Status";
import { IRedirector } from "./Redirect";

export interface ILoginProps extends IStatusHandler, IRedirector {
}

export interface ILoginState {
}

export interface ILoginResult {
    apiKey: string;
    id: number;
    username: string;
}
