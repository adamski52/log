import React, { MouseEvent } from 'react';
import { IDiaryEntryProps, IDiaryEntryState } from '../interfaces/DiaryEntry';
import UtilService from '../services/Util';
import HttpService from '../services/Http';

export default class DiaryEntry extends React.Component<IDiaryEntryProps, IDiaryEntryState> {
    constructor(props: IDiaryEntryProps) {
        super(props);
        this.state = {
            entry: props.entry
        };

        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    public componentDidMount() {
        if(!UtilService.isAuthenticated()) {
            this.props.history.push("/");
            return;
        }
    }

    private onEdit(e:MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        this.props.history.push("/diary/edit/" + this.state.entry.id);
    }

    private async onDelete(e:MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if(!window.confirm("Are you sure you want to delete this entry?")) {
            return;
        }

        try {
            await HttpService.delete("/api/diary/" + this.state.entry.id);
            this.props.history.push("/diary");
        }
        catch(e) {
            this.props.showStatus("Failed to delete entry.", UtilService.STATUS_ERROR);
        }
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

    private getClassName() {
        if(this.state.entry.isProblematic) {
            return "problematic-entry";
        }

        if(this.state.entry.isGood) {
            return "good-entry";
        }

        return "";
    }

    public render() {
        let hungerInfo = UtilService.getHungerScales().find((scale) => {
            return scale.value === this.state.entry.hunger;
        });

        let slotInfo = UtilService.getTimeSlots().find((slot) => {
            return slot.value === this.state.entry.slot;
        });

        return (
            <tr className={this.getClassName()}>
                <td>{UtilService.getDateString(this.state.entry.date)}</td>
                <td>
                    <span className={slotInfo!.className + " badge"}>{slotInfo!.name}</span>
                </td>
                <td>{this.renderParagraphs(this.state.entry.food)}</td>
                <td>
                    <span className={hungerInfo!.className + " badge"}>{hungerInfo!.name}</span>
                </td>
                <td>{this.renderParagraphs(this.state.entry.thoughts)}</td>
                <td>{this.renderParagraphs(this.state.entry.activity)}</td>
                <td>{this.renderParagraphs(this.state.entry.exercise)}</td>
                <td>
                    <button onClick={this.onEdit} className="btn btn-primary icon-pencil-square" />
                    <button onClick={this.onDelete} className="btn btn-danger icon-trash" />
                </td>
            </tr>
        );
    }
}

