import { IStatus } from "./Status";
import { IRedirectHandler } from "./Redirect";

export interface IAppProps {
}

export interface IAppState extends IRedirectHandler {
    status: IStatus;
}
