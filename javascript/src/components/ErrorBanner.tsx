import React from 'react';
import { IErrorProps, IErrorState } from '../interfaces/Error';

export default class ErrorBanner extends React.Component<IErrorProps, IErrorState> {
    constructor(props:IErrorProps) {
        super(props);

        this.state = {
            error: props.error
        };
    }

    public static getDerivedStateFromProps(props:IErrorProps, state:IErrorState) {
        return {
            error: props.error
        };
    }
    
    public render() {
        if(!this.state.error.message) {
            return null;
        }

        return (
            <div className="error-banner-wrapper">
                <div className="alert alert-danger">
                    <p>{this.state.error.message}</p>
                </div>
            </div>
        );
    }
}

