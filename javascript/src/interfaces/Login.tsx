import { IStatusHandler } from "./Status";
import { IRouteHandler } from "./RouteHandler";

export interface ILoginProps extends IStatusHandler, IRouteHandler {
}

export interface ILoginState {
}

export interface ILoginResult {
    apiKey: string;
    id: number;
    username: string;
}
