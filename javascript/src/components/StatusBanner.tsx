import React from 'react';
import { IStatusProps, IStatusState } from '../interfaces/Status';

export default class StatusBanner extends React.Component<IStatusProps, IStatusState> {
    constructor(props:IStatusProps) {
        super(props);

        this.state = {
            status: props.status
        };
    }

    public static getDerivedStateFromProps(props:IStatusProps, state:IStatusState) {
        return {
            status: props.status
        };
    }
    
    public render() {
        if(!this.state.status.message) {
            return null;
        }

        return (
            <div className="status-banner-wrapper">
                <div className={"alert alert-" + this.state.status.type || "-info" }>
                    <p>{this.state.status.message}</p>
                </div>
            </div>
        );
    }
}

