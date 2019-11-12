import React, { MouseEvent, ChangeEvent } from 'react';
import { Link } from "react-router-dom";
import { IDiaryEntryFormProps, IDiaryEntryFormState } from '../interfaces/DiaryEntryForm';
import TimeSlot from './TimeSlot';
import HungerScale from './HungerScale';
import UtilService from '../services/Util';
import { Redirect } from 'react-router';
import HttpService from '../services/Http';

export default class DiaryEntryForm extends React.Component<IDiaryEntryFormProps, IDiaryEntryFormState> {
    private dateRef:React.RefObject<HTMLInputElement> = React.createRef();
    private foodRef:React.RefObject<HTMLTextAreaElement> = React.createRef();
    private thoughtsRef:React.RefObject<HTMLTextAreaElement> = React.createRef();
    private activityRef:React.RefObject<HTMLTextAreaElement> = React.createRef();

    constructor(props: IDiaryEntryFormProps) {
        super(props);

        this.state = {
            entry: {
                id: -1,
                date: UtilService.getDateStringFromDate(new Date()),
                food: "",
                thoughts: "",
                activity: "",
                hunger: 0,
                slot: 0,
                isProblematic: false
            }
        };

        this.onSave = this.onSave.bind(this);
        this.onHungerScaleChange = this.onHungerScaleChange.bind(this);
        this.onTimeSlotChange = this.onTimeSlotChange.bind(this);
        this.onIsProblematicChange = this.onIsProblematicChange.bind(this);
    }

    private onIsProblematicChange(e:ChangeEvent<HTMLInputElement>) {
        this.setState({
            entry: {
                ...this.state.entry,
                isProblematic: !this.state.entry.isProblematic
            }
        }, () => {
            console.log("now?", this.state);
        });
    }

    private onHungerScaleChange(value:number) {
        this.setState({
            entry: {
                ...this.state.entry,
                hunger: value
            }
        });
    }

    private onTimeSlotChange(value:number) {
        this.setState({
            entry: {
                ...this.state.entry,
                slot: value
            }
        });
    }

    private async createNewEntry() {
        try {
            await HttpService.post("/api/diary", {
                date: new Date(this.dateRef.current!.value),
                food: UtilService.getRefValue(this.foodRef),
                thoughts: UtilService.getRefValue(this.thoughtsRef),
                slot: this.state.entry.slot,
                hunger: this.state.entry.hunger,
                isProblematic: !!this.state.entry.isProblematic,
                activity: UtilService.getRefValue(this.activityRef)
            });
            
            this.props.showStatus("Entry created successfully.", UtilService.STATUS_SUCCESS);

            this.setState({
                redirectTo: "/diary"
            });
        }
        catch(e) {
            this.props.showStatus("Failed to create entry.", UtilService.STATUS_ERROR);
        }
    }

    private async updateEntry() {
        try {
            await HttpService.put("/api/diary/" + this.state.entry.id, {
                id: this.state.entry.id,
                date: new Date(this.dateRef.current!.value),
                food: UtilService.getRefValue(this.foodRef),
                thoughts: UtilService.getRefValue(this.thoughtsRef),
                slot: this.state.entry.slot,
                hunger: this.state.entry.hunger,
                isProblematic: !!this.state.entry.isProblematic,
                activity: UtilService.getRefValue(this.activityRef)
            });

            this.props.showStatus("Entry updated successfully.", UtilService.STATUS_SUCCESS);

            this.setState({
                redirectTo: "/diary"
            });
        }
        catch(e) {
            this.props.showStatus("Failed to update entry.", UtilService.STATUS_ERROR);
        }
    }

    private onSave(e:MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        if(this.state.entry.id === -1) {
            this.createNewEntry();
            return;
        }

        this.updateEntry();
    }

    public async componentDidMount() {
        if(!this.props.match || !this.props.match.params || !this.props.match.params.id) {
            return;
        }

        try {
            let response = await HttpService.get("/api/diary/" + this.props.match.params.id);
            this.setState({
                entry: {
                    id: response.id,
                    date: UtilService.getDateStringFromDate(new Date(response.date)),
                    food: response.food,
                    thoughts: response.thoughts,
                    activity: response.activity,
                    hunger: response.hunger,
                    slot: response.slot,
                    isProblematic: !!response.isProblematic
                }
            });
        }
        catch(e) {
            this.props.showStatus("Failed to load entry.", UtilService.STATUS_ERROR);
        }
    }

    public render() {
        if(!UtilService.isAuthenticated()) {
            return (
                <Redirect to="/" />
            );
        }

        if(this.state.redirectTo) {
            return (
                <Redirect to={this.state.redirectTo} />
            );
        }

        return (
            <div className="diary-entry-form-wrapper">
                <div className="row">
                    <div className="col-12 controls-wrapper">
                        <Link to="/diary" className="btn btn-primary">Back to List</Link>
                    </div>
                </div>
                <form className="row diary-entry-form">
                    <div className="col-4">
                        <div className="form-group">
                            <label>Date</label>
                            <input type="text" className="form-control" ref={this.dateRef} defaultValue={UtilService.getDateString(this.state.entry.date)} />
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-group">
                            <label>Time</label>
                            <TimeSlot onValueChange={this.onTimeSlotChange} value={this.state.entry.slot} />
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-group">
                            <label>Hunger</label>
                            <HungerScale onValueChange={this.onHungerScaleChange} value={this.state.entry.hunger} />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label>Activity</label>
                            <textarea className="form-control" defaultValue={this.state.entry.activity} ref={this.activityRef} />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label>Thoughts</label>
                            <textarea className="form-control" defaultValue={this.state.entry.thoughts} ref={this.thoughtsRef} />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <label>Food</label>
                            <textarea className="form-control" defaultValue={this.state.entry.food} ref={this.foodRef} />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" checked={this.state.entry.isProblematic} onChange={this.onIsProblematicChange} />
                            <label className="form-check-label">Problematic</label>
                        </div>
                    </div>
                    <div className="col-12 text-right controls-wrapper">
                        <Link to="/diary" className="btn btn-danger icon-ban">Cancel</Link>
                        <button onClick={this.onSave} className="btn btn-primary icon-check">Save</button>
                    </div>
                </form>
            </div>
        );
    }
}

