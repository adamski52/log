import {IDiaryEntry} from "./DiaryEntry";
import { IRedirector } from "./Redirect";
import { IRouteHandler } from "./RouteHandler";
import { IStatusHandler } from "./Status";

export interface IDiaryEntryFormProps extends IStatusHandler, IRouteHandler, IRedirector {
    entry?: IDiaryEntry;
}

export interface IDiaryEntryFormState {
    entry: IDiaryEntry;
}
