import {IDiaryEntry} from "./DiaryEntry";
import { IAuthentication } from "./Authentication";
import { IErrorHandler } from "./Error";

export interface IDiaryProps extends IErrorHandler, IAuthentication {
}

export interface IDiaryState extends IAuthentication {
    entries: IDiaryEntry[];
}
