import { IStatusHandler } from "./Status";
import { IRouteHandler } from "./RouteHandler";

export interface IDiaryEntry {
    id: number;
    date: string;
    slot: number;
    food: string | null;
    thoughts: string | null;
    hunger: number;
    activity: string | null;
    isProblematic: boolean;
    isGood: boolean;
    exercise: string | null;
}

export interface IDiaryEntryProps extends IStatusHandler, IRouteHandler {
    entry: IDiaryEntry;
}

export interface IDiaryEntryState {
    entry: IDiaryEntry;
}
