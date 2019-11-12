import { IRedirectHandler } from "./Redirect";
import { IRouteHandler } from "./RouteHandler";
import { IStatusHandler } from "./Status";

export interface IDiaryEntry {
    id: number;
    date: string;
    slot: number;
    food: string;
    thoughts: string;
    hunger: number;
    activity: string;
    isProblematic: boolean;
}

export interface IDiaryEntryProps extends IStatusHandler, IRouteHandler {
    entry: IDiaryEntry;
}

export interface IDiaryEntryState extends IRedirectHandler {
    entry: IDiaryEntry;
}
