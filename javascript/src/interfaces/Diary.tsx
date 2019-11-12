import {IDiaryEntry} from "./DiaryEntry";
import { IStatusHandler } from "./Status";

export interface IDiaryProps extends IStatusHandler {
}

export interface IDiaryState {
    entries: IDiaryEntry[];
}
