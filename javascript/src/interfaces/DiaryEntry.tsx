import { IStatusHandler } from "./Status";
import { IRouteHandler } from "./RouteHandler";

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

export interface IDiaryEntryState {
    entry: IDiaryEntry;
}
