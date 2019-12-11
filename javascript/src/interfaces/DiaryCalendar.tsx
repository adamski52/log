import {IDiaryEntry} from "./DiaryEntry";

export interface IDiaryCalendarProps {
    entries: IDiaryEntry[]
}

export interface IDiaryCalendarState {
    events: IDiaryEvent[];
}

export interface IDiaryEvent {
    start: Date;
    end: Date;
    title: string;
}
