import { NestedCSSProperties } from "typestyle/lib/types";

export interface ITimeSlotProps {
    value: number;
    onValueChange: (value:number) => void;
}

export interface ITimeSlotState {
    value: number;
}

export interface ITimeSlot {
    name: string;
    backgroundColor: string;
    color: string;
    value: number;
    className: string;
}
