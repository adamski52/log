import React from 'react';
import { IDiaryCalendarProps, IDiaryCalendarState, IDiaryEvent } from '../interfaces/DiaryCalendar';
import { Calendar, momentLocalizer, Event, stringOrDate } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { IDiaryEntry } from '../interfaces/DiaryEntry';
import moment from 'moment';
import UtilService from '../services/Util';
import { ITimeSlot } from '../interfaces/TimeSlot';

export default class DiaryCalendar extends React.Component<IDiaryCalendarProps, IDiaryCalendarState> {


    constructor(props:IDiaryCalendarProps) {
        super(props);
        
        this.state = {
            events: DiaryCalendar.getEvents(props.entries)
        };
    }

    public static getDerivedStateFromProps(props:IDiaryCalendarProps, state: IDiaryCalendarState) {
        return {
            events: DiaryCalendar.getEvents(props.entries)
        };
    }

    private static getEvents(entries:IDiaryEntry[]):IDiaryEvent[] {
        let slots = UtilService.getTimeSlots();
        return entries.map((entry) => {
            let startDate = moment(entry.date),
                endDate = moment(entry.date).add(1, "days"),
                slot:ITimeSlot = slots.find((timeSlot) => {
                    return timeSlot.value === entry.slot;
                }) as ITimeSlot;

            let obj = {
                start: startDate.toDate(),
                end: endDate.toDate(),
                title: slot.name,
                allDay: true,
                resource: entry
            };
            
            console.log("WAT", obj);
            return obj;
        });
    }

    private getEventStyle(event:Event, start:stringOrDate, end:stringOrDate, isSelected:boolean) {
        let slots = UtilService.getTimeSlots(),
            slot:ITimeSlot = slots.find((timeSlot) => {
                return timeSlot.value === event.resource.slot;
            }) as ITimeSlot;

        return {
            style: {
                backgroundColor: slot.backgroundColor,
                color: slot.color
            }
        };
    }

    private onSelectEvent(event:Event, e:React.SyntheticEvent<HTMLElement>) {
        console.log(event, e);
    }


    public render() {
        return (
            <div className="row diary-calendar-wrapper justify-content-center">
                <Calendar
                    events={this.state.events}
                    localizer={momentLocalizer(moment)}
                    startAccessor="start"
                    endAccessor="end"
                    popup={false}
                    eventPropGetter={this.getEventStyle}
                    onSelectEvent={this.onSelectEvent}
                />

{/* <div>
        <Calendar
          popup={false}
          onShowMore={(events, date) => this.setState({ showModal: true, events })}
          ...
        />
        {this.state.showModal && <Modal events={this.state.events}/>}
      </div> */}
            </div>
        );
    }
}

