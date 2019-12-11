import {style} from 'typestyle';
import Cookie from "js-cookie";
import { ITimeSlot } from '../interfaces/TimeSlot';

export default class UtilService {

    public static STATUS_SUCCESS = "success";
    public static STATUS_ERROR = "danger";

    public static getDateString(d:string) {
        let fullDate = new Date(d);
        return this.getDateStringFromDate(fullDate);
    }

    public static getAPIKeyFromCookie() {
        let apiKey = Cookie.get("X-API-KEY");
        if(apiKey) {
            return apiKey;
        }

        return "";
    }

    public static isAuthenticated() {
        let apiKey = this.getAPIKeyFromCookie();
        return !!apiKey;
    }
    
    public static getDateStringFromDate(fullDate:Date) {
        let date = fullDate.getDate() + "";
        if(date.length < 2) {
            date = "0" + date;
        }

        return fullDate.getFullYear() + "/" + (fullDate.getMonth() + 1) + "/" + date;
    }

    public static getRefValue(ref:React.RefObject<HTMLInputElement | HTMLTextAreaElement>) {
        if(ref.current && ref.current.value) {
            return ref.current.value;
        }

        return null;
    }

    public static getHungerScales() {
        return [{
            name: "Painfully Full",
            value: 0,
            className: style({
                "backgroundColor": "#bb2c2c",
                "color": "#fff"
            })
        }, {
            name: "Uncomfortably Full",
            value: 1,
            className: style({
                "backgroundColor": "#c37b48",
                "color": "#fff"
            })
        }, {
            name: "Very Full",
            value: 2,
            className: style({
                "backgroundColor": "#dabb24",
                "color": "#fff"
            }),
        }, {
            name: "Satisfied",
            value: 3,
            className: style({
                "backgroundColor": "#669816",
                "color": "#fff"
            })
        }, {
            name: "Mindful Fullness",
            value: 4,
            className: style({
                "backgroundColor": "#476b0d",
                "color": "#fff"
            })
        }, {
            name: "Neutral",
            value: 5,
            className: style({
                "backgroundColor": "#3db599",
                "color": "#fff"
            })
        }, {
            name: "Hungry",
            value: 6,
            className: style({
                "backgroundColor": "#3d7eb5",
                "color": "#fff"
            })
        }, {
            name: "Very Hungry",
            value: 7,
            className: style({
                "backgroundColor": "#62179a",
                "color": "#fff"
            })
        }, {
            name: "Uncomfortably Hungry",
            value: 8,
            className: style({
                "backgroundColor": "#9a1790",
                "color": "#fff"
            })
        }, {
            name: "Painfully Hungry",
            value: 9,
            className: style({
                "backgroundColor": "#80092a",
                "color": "#fff"
            })
        }];
    }

    public static getTimeSlots():ITimeSlot[] {
        return [{
            name: "Breakfast",
            value: 0,
            backgroundColor: "#bd544f",
            color: "#fff",
            className: style({
                "backgroundColor": "#bd544f",
                "color": "#fff"
            })
        }, {
            name: "Morning Snack",
            value: 1,
            backgroundColor: "#d66300",
            color: "#fff",
            className: style({
                "backgroundColor": "#d66300",
                "color": "#fff"
            })
        }, {
            name: "Lunch",
            value: 2,
            backgroundColor: "#839a00",
            color: "#fff",
            className: style({
                "backgroundColor": "#839a00",
                "color": "#fff"
            }),
        }, {
            name: "Afternoon Snack",
            value: 3,
            backgroundColor: "#0f8282",
            color: "#fff",
            className: style({
                "backgroundColor": "#0f8282",
                "color": "#fff"
            })
        }, {
            name: "Dinner",
            value: 4,
            backgroundColor: "#2a65d0",
            color: "#fff",
            className: style({
                "backgroundColor": "#2a65d0",
                "color": "#fff"
            })
        }, {
            name: "Evening Snack",
            value: 5,
            backgroundColor: "#792ad0",
            color: "#fff",
            className: style({
                "backgroundColor": "#792ad0",
                "color": "#fff"
            })
        }];
    }
}