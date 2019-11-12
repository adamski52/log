import {IDiaryEntry} from "./DiaryEntry";
import { IRedirectHandler } from "./Redirect";
import { IRouteHandler } from "./RouteHandler";
import { IStatusHandler } from "./Status";

export interface IDiaryEntryFormProps extends IStatusHandler, IRouteHandler {
    entry?: IDiaryEntry;
}

export interface IDiaryEntryFormState extends IRedirectHandler {
    entry: IDiaryEntry;
}
