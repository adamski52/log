import React, { MouseEvent } from 'react';
import { IDiaryCalendarProps, IDiaryCalendarState, IDiaryEvent } from '../interfaces/DiaryCalendar';
import { Calendar, momentLocalizer, Event, stringOrDate } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { IDiaryEntry } from '../interfaces/DiaryEntry';
import moment from 'moment';
import UtilService from '../services/Util';
import { ITimeSlot } from '../interfaces/TimeSlot';
import HttpService from '../services/Http';

export default class DiaryCalendar extends React.Component<IDiaryCalendarProps, IDiaryCalendarState> {


    constructor(props:IDiaryCalendarProps) {
        super(props);
        
        this.state = {
            events: DiaryCalendar.getEvents(props.entries)
        };

        this.onCloseModal = this.onCloseModal.bind(this);
        this.onSelectEvent = this.onSelectEvent.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    private onEdit(e:MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        this.props.history.push("/diary/edit/" + this.state.modal!.id);
    }

    private async onDelete(e:MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if(!window.confirm("Are you sure you want to delete this entry?")) {
            return;
        }

        try {
            await HttpService.delete("/api/diary/" + this.state.modal!.id);
            this.props.history.push("/diary");
        }
        catch(e) {
            this.props.showStatus("Failed to delete entry.", UtilService.STATUS_ERROR);
        }
    }

    public static getDerivedStateFromProps(props:IDiaryCalendarProps, state: IDiaryCalendarState) {
        return {
            events: DiaryCalendar.getEvents(props.entries)
        };
    }

    private static getEvents(entries:IDiaryEntry[]):IDiaryEvent[] {
        // TODO:  Time?  Even if generic for slot (lunch = noon, etc)?

        return entries.map((entry) => {
            let startDate = moment(entry.date),
                endDate = moment(entry.date).add(1, "days"),
                slot = UtilService.getTimeSlotByValue(entry.slot) as ITimeSlot;

            return {
                start: startDate.toDate(),
                end: endDate.toDate(),
                title: slot.name,
                allDay: true,
                resource: entry
            };
        });
    }

    private getEventStyle(event:Event) {
        let slot = UtilService.getTimeSlotByValue(event.resource.slot) as ITimeSlot;

        return {
            style: {
                backgroundColor: slot.backgroundColor,
                color: slot.color
            }
        };
    }

    private onSelectEvent(event:Event, e:React.SyntheticEvent<HTMLElement>) {
        this.setState({
            modal: event.resource
        });
    }

    private onCloseModal() {
        this.setState({
            modal: undefined
        });
    }

    private renderParagraphs(value:string | null) {
        if(!value) {
            return "";
        }
        
        let lines = value.split("\n"),
            ps = lines.map((line, index) => {
                return (
                    <p key={index}>{line}</p>
                );
            });
        
        return ps;
    }

    private renderIcon() {
        if(this.state.modal!.isProblematic) {
            return (
                <span className="problematic-entry badge icon-exclamation-triangle">Problematic</span>
            );
        }

        if(this.state.modal!.isGood) {
            return (
                <span className="good-entry badge icon-child">Successful</span>
            );
        }

        return null;
    }

    private renderModal() {
        if(!this.state.modal) {
            return null;
        }

        let slot = UtilService.getTimeSlotByValue(this.state.modal.slot),
            scale = UtilService.getHungerScaleByValue(this.state.modal.hunger);

        return (
            <>
                <div className="modal show" style={{display: "block"}}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    <span className={slot!.className + " badge"}>{slot!.name} {UtilService.getDateString(this.state.modal.date)}</span>
                                    {this.renderIcon()}
                                </h5>
                                <button className="close icon-times" onClick={this.onCloseModal}/>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="modal-row col-12">
                                        <span className="modal-row-title">Hunger:</span>
                                        <span className={scale!.className + " badge"}>{scale!.name}</span>
                                    </div>
                                    <div className="modal-row col-6">
                                        <p className="modal-row-title">Activity:</p>
                                        {this.renderParagraphs(this.state.modal.activity)}
                                    </div>
                                    <div className="modal-row col-6">
                                        <p className="modal-row-title">Thoughts:</p>
                                        {this.renderParagraphs(this.state.modal.activity)}
                                    </div>
                                    <div className="modal-row col-6">
                                        <p className="modal-row-title">Food:</p>
                                        {this.renderParagraphs(this.state.modal.food)}
                                    </div>
                                    <div className="modal-row col-6">
                                        <p className="modal-row-title">Exercise:</p>
                                        {this.renderParagraphs(this.state.modal.exercise)}
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button onClick={this.onEdit} className="btn btn-primary icon-pencil-square" />
                                <button onClick={this.onDelete} className="btn btn-danger icon-trash" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-backdrop show" />
            </>
        );
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
                {this.renderModal()}
            </div>
        );
    }
}

