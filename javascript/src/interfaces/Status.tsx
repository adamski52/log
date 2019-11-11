export interface IStatus {
    message: string;
    type: string;
}

export interface IStatusProps {
    status: IStatus;
}

export interface IStatusState {
    status: IStatus;
}

export interface IStatusHandler {
    showStatus: (message:string, type:string) => void;
}
