export interface IRedirectHandler {
    redirectTo?: string;
}

export interface IRedirector {
    onRedirect: (to:string) => void;
}