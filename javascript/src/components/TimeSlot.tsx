import React from 'react';
import { ITimeSlotProps } from '../interfaces/TimeSlot';
import {style} from 'typestyle';
import ScalingSelector from './ScalingSelector';

export default class TimeSlot extends ScalingSelector {
    constructor(props:ITimeSlotProps) {
        super(props);
        
        this.state = {
            ...this.state,
            items: [{
                name: "Breakfast",
                value: 0,
                className: style({
                    "backgroundColor": "#000",
                    "color": "#fff"
                })
            }, {
                name: "Morning Snack",
                value: 1,
                className: style({
                    "backgroundColor": "#f00",
                    "color": "#fff"
                })
            }, {
                name: "Lunch",
                value: 2,
                className: style({
                    "backgroundColor": "#0f0",
                    "color": "#fff"
                }),
            }, {
                name: "Afternoon Snack",
                value: 3,
                className: style({
                    "backgroundColor": "#00f",
                    "color": "#fff"
                })
            }, {
                name: "Dinner",
                value: 4,
                className: style({
                    "backgroundColor": "#f0f",
                    "color": "#fff"
                })
            }, {
                name: "Evening Snack",
                value: 5,
                className: style({
                    "backgroundColor": "#0ff",
                    "color": "#fff"
                })
            }]
        };
    }
}