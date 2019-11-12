import { IStatusHandler } from "./Status";
import { IRedirectHandler } from "./Redirect";

export interface ILoginProps extends IStatusHandler {
}

export interface ILoginState extends IRedirectHandler {
}

export interface ILoginResult {
    apiKey: string;
    id: number;
    username: string;
}
