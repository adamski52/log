import React, { MouseEvent } from 'react';
import { IDiaryEntryProps, IDiaryEntryState } from '../interfaces/DiaryEntry';
import TimeSlot from './TimeSlot';
import HungerScale from './HungerScale';

export default class DiaryEntry extends React.Component<IDiaryEntryProps, IDiaryEntryState> {
    private dateRef:React.RefObject<HTMLInputElement> = React.createRef();
    private slotRef:React.RefObject<TimeSlot> = React.createRef();
    private foodRef:React.RefObject<HTMLTextAreaElement> = React.createRef();
    private hungerRef:React.RefObject<HungerScale> = React.createRef();
    private thoughtsRef:React.RefObject<HTMLTextAreaElement> = React.createRef();

    constructor(props: IDiaryEntryProps) {
        super(props);
        this.state = {
            entry: props.entry,
            disabled: !!props.disabled,
            isTemplate: !!props.isTemplate
        };

        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onCancel = this.onDelete.bind(this);
        this.onSave = this.onSave.bind(this);
    }


    private onSave(e:MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
    }

    private onEdit(e:MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        this.setState({
            disabled: true
        })
    }

    private onCancel(e:MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        this.setState({
            entry: this.props.entry,
            disabled: false
        });
    }

    private onDelete(e:MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
    }

    private getDateString(d:Date) {
        let date = d.getDate() + "";
        if(date.length < 2) {
            date = "0" + date;
        }

        return d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + date;
    }

    private getEditOrCancelButton() {
        if(this.state.isTemplate) {
            return null;
        }

        if(!this.state.disabled) {
            return (
                <button onClick={this.onCancel} className="icon-ban">Cancel</button>
            )
        }

        return (
            <button onClick={this.onEdit} className="icon-pencil-square">Edit</button>
        )
    }

    private getDeleteButton() {
        if(this.state.isTemplate) {
            return null;
        }

        return (
            <button onClick={this.onDelete} className="icon-trash">Delete</button>
        );
    }

    private getSaveButton() {
        if(this.state.disabled) {
            return null;
        }

        if(this.state.isTemplate) {
            return (
                <button onClick={this.onSave} className="icon-check">Save</button>
            )
        }
    }

    public render() {
        return (
            <tr>
                <td><input type="text" ref={this.dateRef} disabled={this.state.disabled} defaultValue={this.getDateString(this.state.entry.date)} /></td>
                <td><TimeSlot ref={this.slotRef} value={this.state.entry.slot} disabled={this.state.disabled} /></td>
                <td><textarea ref={this.foodRef} disabled={this.state.disabled} /></td>
                <td><HungerScale ref={this.hungerRef} value={this.state.entry.hunger} disabled={this.state.disabled} /></td>
                <td><textarea ref={this.thoughtsRef} disabled={this.state.disabled} /></td>
                <td>
                    {this.getEditOrCancelButton()}
                    {this.getSaveButton()}
                    {this.getDeleteButton()}
                </td>
            </tr>
        );
    }
}

