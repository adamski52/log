import {IDiaryEntry} from "./DiaryEntry";
import { IAuthentication } from "./Authentication";

export interface IDiaryProps {
    auth: IAuthentication;
    entries: IDiaryEntry[];
}

export interface IDiaryState {
    auth: IAuthentication;
    entries: IDiaryEntry[];
}
