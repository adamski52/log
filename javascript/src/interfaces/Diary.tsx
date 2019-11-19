import {IDiaryEntry} from "./DiaryEntry";
import { IStatusHandler } from "./Status";
import { IFilterCondition } from "./FilterCondition";
import { IRouteHandler } from "./RouteHandler";

export interface IDiaryProps extends IStatusHandler, IRouteHandler {
}

export interface IDiaryState {
    entries: IDiaryEntry[];
    filters: IFilterCondition[];
}
