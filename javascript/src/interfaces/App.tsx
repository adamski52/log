import { IStatus } from "./Status";
import { IAuthentication } from "./Authentication";


export interface IAppProps {
}

export interface IAppState extends IAuthentication {
    status: IStatus;
}
