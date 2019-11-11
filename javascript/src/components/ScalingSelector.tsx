import React, { MouseEvent } from 'react';
import { IScalingSelectorProps, IScalingSelectorState} from "../interfaces/ScalingSelector";

export default abstract class ScalingSelector extends React.Component<IScalingSelectorProps, IScalingSelectorState>  {       
    constructor(props:IScalingSelectorProps) {
        super(props);
        
        this.state = {
            value: props.value,
            disabled: !!props.disabled,
            items: props.items || []
        };

        this.onScrollBack = this.onScrollBack.bind(this);
        this.onScrollForward = this.onScrollForward.bind(this);
    }

    private onScrollBack(e:MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        this.onScroll(-1);
    }

    private onScrollForward(e:MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        this.onScroll(1);
    }

    private onScroll(direction:number) {
        let value = this.state.value + direction;
        value = Math.min(Math.max(value, 0), this.state.items.length - 1);
        this.props.onValueChange(value);
    }

    public static getDerivedStateFromProps(props:IScalingSelectorProps, state: IScalingSelectorState) {
        return {
            value: props.value
        };
    }

    public render() {
        let value = Math.min(this.state.value || 0, this.state.items.length - 1);
        return (
            <div className="scaling-selector-wrapper">
                <button onClick={this.onScrollBack} className="icon-caret-up"></button>
                <div className={this.state.items[value].className}>{this.state.items[value].name}</div>
                <button onClick={this.onScrollForward} className="icon-caret-down"></button>
            </div>
        );
    }
}

