import React from 'react';
import { Link } from "react-router-dom";
import { IDiaryProps, IDiaryState } from '../interfaces/Diary';
import DiaryEntry from './DiaryEntry';
import HttpService from '../services/Http';
import { Redirect } from 'react-router';
import { IDiaryEntry } from '../interfaces/DiaryEntry';
import UtilService from '../services/Util';

export default class Diary extends React.Component<IDiaryProps, IDiaryState> {
    constructor(props:IDiaryProps) {
        super(props);
        
        this.state = {
            entries: []
        };
    }

    private renderEntries() {
        return this.state.entries.map((entry:IDiaryEntry) => {
            return (
                <DiaryEntry entry={entry} key={entry.id} showStatus={this.props.showStatus} />
            );
        });
    }

    private async fetch() {
        if(!UtilService.isAuthenticated()) {
            return;
        }

        try {
            let result:IDiaryEntry[] = await HttpService.get("/api/diary");

            this.setState({
                entries: result
            });
        }
        catch(e) {
            this.props.showStatus("Failed to fetch entries.", UtilService.STATUS_ERROR);
        }
    }

    public componentDidMount() {
        this.fetch();
    }

    public render() {
        if(!UtilService.isAuthenticated()) {
            return (
                <Redirect to="/" />
            );
        }

        return (
            <div className="row diary-entries-wrapper justify-content-center">
                <div className="col-12 controls-wrapper">
                    <Link className="btn btn-primary" to="/diary/create">Create</Link>
                </div>
                <table className="col-10">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Food</th>
                            <th>Hunger</th>
                            <th>Thoughts</th>
                            <th>Activity</th>
                            <th className="controls-column"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderEntries()}
                    </tbody>
                </table>
            </div>
        );
    }
}

