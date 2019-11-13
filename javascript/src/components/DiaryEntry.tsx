import React, { MouseEvent } from 'react';
import { Link } from "react-router-dom";
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

    private onEdit(e:MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
    }

    private async onDelete(e:MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if(!window.confirm("Are you sure you want to delete this entry?")) {
            return;
        }

        try {
            await HttpService.delete("/api/diary/" + this.state.entry.id);
            this.props.onRedirect("/diary");
        }
        catch(e) {
            this.props.showStatus("Failed to delete entry.", UtilService.STATUS_ERROR);
        }
    }

    private renderParagraphs(value:string) {
        let lines = value.split("\n"),
            ps = lines.map((line, index) => {
                return (
                    <p key={index}>{line}</p>
                );
            });
        
        return ps;
    }

    public render() {
        let hungerInfo = UtilService.getHungerScales().find((scale) => {
            return scale.value === this.state.entry.hunger;
        });

        let slotInfo = UtilService.getTimeSlots().find((slot) => {
            return slot.value === this.state.entry.slot;
        });

        return (
            <tr className={this.state.entry.isProblematic ? "problematic-entry" : "obv not"}>
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
                <td>
                    <Link to={"/diary/edit/" + this.state.entry.id} className="btn btn-primary icon-pencil-square" />
                    <button onClick={this.onDelete} className="btn btn-danger icon-trash" />
                </td>
            </tr>
        );
    }
}

