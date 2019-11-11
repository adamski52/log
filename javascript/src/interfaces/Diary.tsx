import {IDiaryEntry} from "./DiaryEntry";
import { IAuthentication } from "./Authentication";
import { IStatusHandler } from "./Status";

export interface IDiaryProps extends IStatusHandler, IAuthentication {
}

export interface IDiaryState extends IAuthentication {
    entries: IDiaryEntry[];
}
