import {IDiaryEntry} from "./DiaryEntry";
import { IAuthentication } from "./Authentication";
import { IRedirectHandler } from "./Redirect";
import { IRouteHandler } from "./RouteHandler";
import { IStatusHandler } from "./Status";

export interface IDiaryEntryFormProps extends IStatusHandler, IAuthentication, IRouteHandler {
    entry?: IDiaryEntry;
}

export interface IDiaryEntryFormState extends IAuthentication, IRedirectHandler {
    entry: IDiaryEntry;
}
