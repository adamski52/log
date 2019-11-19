import {IDiaryEntry} from "./DiaryEntry";
import { IStatusHandler } from "./Status";
import { IRouteHandler } from "./RouteHandler";

export interface IDiaryEntryFormProps extends IStatusHandler, IRouteHandler {
    entry?: IDiaryEntry;
}

export interface IDiaryEntryFormState {
    entry: IDiaryEntry;
}
