export interface IError {
    message: string;
}

export interface IErrorProps {
    error: IError;
}

export interface IErrorState {
    error: IError;
}

export interface IErrorHandler {
    onError: (message:string) => void;
    onClearError: () => void;
}
