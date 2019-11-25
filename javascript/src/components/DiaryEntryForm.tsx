import React, { MouseEvent, ChangeEvent } from 'react';
import { IDiaryEntryFormProps, IDiaryEntryFormState } from '../interfaces/DiaryEntryForm';
import TimeSlot from './TimeSlot';
import HungerScale from './HungerScale';
import UtilService from '../services/Util';
import HttpService from '../services/Http';

export default class DiaryEntryForm extends React.Component<IDiaryEntryFormProps, IDiaryEntryFormState> {
    private foodRef:React.RefObject<HTMLTextAreaElement> = React.createRef();
    private thoughtsRef:React.RefObject<HTMLTextAreaElement> = React.createRef();
    private activityRef:React.RefObject<HTMLTextAreaElement> = React.createRef();
    private exerciseRef:React.RefObject<HTMLTextAreaElement> = React.createRef();

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
                isProblematic: false,
                isGood: false,
                exercise: ""
            }
        };

        this.onSave = this.onSave.bind(this);
        this.onHungerScaleChange = this.onHungerScaleChange.bind(this);
        this.onTimeSlotChange = this.onTimeSlotChange.bind(this);
        this.onIsProblematicChange = this.onIsProblematicChange.bind(this);
        this.onIsGoodChange = this.onIsGoodChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onBackToList = this.onBackToList.bind(this);
    }

    private onDateChange(e:ChangeEvent<HTMLInputElement>) {
        this.setState({
            entry: {
                ...this.state.entry,
                date: e.target.value
            }
        });
    }

    private onBackToList(e:MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        this.props.history.push("/diary");
    }

    private onIsProblematicChange(e:ChangeEvent<HTMLInputElement>) {
        this.setState({
            entry: {
                ...this.state.entry,
                isGood: false,
                isProblematic: !this.state.entry.isProblematic
            }
        });
    }

    private onIsGoodChange(e:ChangeEvent<HTMLInputElement>) {
        this.setState({
            entry: {
                ...this.state.entry,
                isProblematic: false,
                isGood: !this.state.entry.isGood
            }
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
                date: new Date(this.state.entry.date),
                food: UtilService.getRefValue(this.foodRef),
                thoughts: UtilService.getRefValue(this.thoughtsRef),
                slot: this.state.entry.slot,
                hunger: this.state.entry.hunger,
                isGood: !!this.state.entry.isGood,
                exercise: UtilService.getRefValue(this.exerciseRef),
                isProblematic: !!this.state.entry.isProblematic,
                activity: UtilService.getRefValue(this.activityRef)
            });
            
            this.props.showStatus("Entry created successfully.", UtilService.STATUS_SUCCESS);
            this.props.history.push("/diary");
        }
        catch(e) {
            this.props.showStatus("Failed to create entry.", UtilService.STATUS_ERROR);
        }
    }

    private async updateEntry() {
        try {
            await HttpService.put("/api/diary/" + this.state.entry.id, {
                id: this.state.entry.id,
                date: new Date(this.state.entry.date),
                food: UtilService.getRefValue(this.foodRef),
                thoughts: UtilService.getRefValue(this.thoughtsRef),
                slot: this.state.entry.slot,
                hunger: this.state.entry.hunger,
                isGood: !!this.state.entry.isGood,
                exercise: UtilService.getRefValue(this.exerciseRef),
                isProblematic: !!this.state.entry.isProblematic,
                activity: UtilService.getRefValue(this.activityRef)
            });

            this.props.showStatus("Entry updated successfully.", UtilService.STATUS_SUCCESS);

            this.props.history.push("/diary");
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
        if(!UtilService.isAuthenticated()) {
            this.props.history.push("/");
            return;
        }

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
                    exercise: response.exercise,
                    isProblematic: !!response.isProblematic,
                    isGood: !!response.isGood
                }
            });
        }
        catch(e) {
            this.props.showStatus("Failed to load entry.", UtilService.STATUS_ERROR);
        }
    }

    public render() {
        return (
            <div className="diary-entry-form-wrapper">
                <div className="row">
                    <div className="col-12 controls-wrapper">
                        <button onClick={this.onBackToList} className="btn btn-primary">Back to List</button>
                    </div>
                </div>
                <form className="row diary-entry-form">
                    <div className="col-4">
                        <div className="form-group">
                            <label>Date</label>
                            <input type="text" className="form-control" onChange={this.onDateChange} value={this.state.entry.date} />
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
                            <textarea className="form-control" defaultValue={this.state.entry.activity || ""} ref={this.activityRef} />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label>Thoughts</label>
                            <textarea className="form-control" defaultValue={this.state.entry.thoughts || ""} ref={this.thoughtsRef} />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label>Food</label>
                            <textarea className="form-control" defaultValue={this.state.entry.food || ""} ref={this.foodRef} />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label>Exercise</label>
                            <textarea className="form-control" defaultValue={this.state.entry.exercise || ""} ref={this.exerciseRef} />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" checked={this.state.entry.isProblematic} onChange={this.onIsProblematicChange} />
                            <label className="form-check-label">Problematic</label>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" checked={this.state.entry.isGood} onChange={this.onIsGoodChange} />
                            <label className="form-check-label">Good</label>
                        </div>
                    </div>
                    <div className="col-12 text-right controls-wrapper">
                        <button onClick={this.onBackToList} className="btn btn-danger icon-ban">Cancel</button>
                        <button onClick={this.onSave} className="btn btn-primary icon-check">Save</button>
                    </div>
                </form>
            </div>
        );
    }
}

