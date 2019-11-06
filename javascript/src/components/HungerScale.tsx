import React from 'react';
import { IHungerScaleProps } from '../interfaces/HungerScale';
import {style} from 'typestyle';
import ScalingSelector from './ScalingSelector';

export default class HungerScale extends ScalingSelector {       
    constructor(props:IHungerScaleProps) {
        super(props);

        this.state = {
            ...this.state,
            items: [{
                name: "Painfully Full",
                value: 0,
                className: style({
                    "backgroundColor": "#000",
                    "color": "#fff"
                })
            }, {
                name: "Uncomfortably Full",
                value: 1,
                className: style({
                    "backgroundColor": "#f00",
                    "color": "#fff"
                })
            }, {
                name: "Very Full",
                value: 2,
                className: style({
                    "backgroundColor": "#0f0",
                    "color": "#fff"
                }),
            }, {
                name: "Satisfied",
                value: 3,
                className: style({
                    "backgroundColor": "#00f",
                    "color": "#fff"
                })
            }, {
                name: "Mindful Fullness",
                value: 4,
                className: style({
                    "backgroundColor": "#f0f",
                    "color": "#fff"
                })
            }, {
                name: "Neutral",
                value: 5,
                className: style({
                    "backgroundColor": "#0ff",
                    "color": "#fff"
                })
            }, {
                name: "Hungry",
                value: 6,
                className: style({
                    "backgroundColor": "#0ff",
                    "color": "#fff"
                })
            }, {
                name: "Very Hungry",
                value: 7,
                className: style({
                    "backgroundColor": "#0ff",
                    "color": "#fff"
                })
            }, {
                name: "Uncomfortably Hungry",
                value: 8,
                className: style({
                    "backgroundColor": "#0ff",
                    "color": "#fff"
                })
            }, {
                name: "Painfully Hungry",
                value: 9,
                className: style({
                    "backgroundColor": "#0ff",
                    "color": "#fff"
                })
            }]
        };
    }
}

