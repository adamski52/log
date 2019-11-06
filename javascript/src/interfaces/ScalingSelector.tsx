export interface IScalingSelector {
    name: string;
    value: number;
    className: string;
}

export interface IScalingSelectorProps {
    disabled?: boolean;
    value: number;
    items?: IScalingSelector[];
}

export interface IScalingSelectorState {
    disabled: boolean;
    value: number;
    items: IScalingSelector[];
}