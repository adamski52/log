import {IDiaryEntry} from "./DiaryEntry";
import { IStatusHandler } from "./Status";
import { IFilterCondition } from "./FilterCondition";
import { IRedirector } from "./Redirect";

export interface IDiaryProps extends IStatusHandler, IRedirector {
}

export interface IDiaryState {
    entries: IDiaryEntry[];
    filters: IFilterCondition[];
}
