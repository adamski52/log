import {IDiaryEntry} from "./DiaryEntry";
import { IRouteHandler } from "./RouteHandler";
import { IStatusHandler } from "./Status";

export interface IDiaryCalendarProps extends IStatusHandler, IRouteHandler {
    entries: IDiaryEntry[]
}

export interface IDiaryCalendarState {
    events: IDiaryEvent[];
    modal?: IDiaryEntry | undefined;
}

export interface IDiaryEvent {
    start: Date;
    end: Date;
    title: string;
}
