import React from 'react';
import { IDiaryProps, IDiaryState } from '../interfaces/Diary';
import DiaryEntry from './DiaryEntry';
import HttpService from '../services/Http';
import { Redirect } from 'react-router';
import { IDiaryEntryResult } from '../interfaces/DiaryEntry';

export default class Diary extends React.Component<IDiaryProps, IDiaryState> {
    constructor(props:IDiaryProps) {
        super(props);
        
        this.state = {
            auth: props.auth,
            entries: []
        };
    }

    private renderEntries() {
        return this.state.entries.map((entry:IDiaryEntryResult) => {
            return (
                <DiaryEntry entry={entry} isTemplate={entry.isTemplate} key={entry.id} />
            );
        });
    }

    private async fetch() {
        if(!this.state.auth.isAuthenticated) {
            return;
        }

        try {
            let result:IDiaryEntryResult[] = await HttpService.get("/api/diary", this.state.auth.apiKey);
            result.unshift({
                id: -1,
                date: new Date(),
                slot: 0,
                food: "",
                thoughts: "",
                hunger: 0,
                isTemplate: true
            });

            this.setState({
                entries: result
            });
        }
        catch(e) {
            this.props.onError("Failed to fetch entries.");
        }
    }

    public componentDidMount() {
        this.fetch();
    }

    public static getDerivedStateFromProps(props:IDiaryProps, state:IDiaryState) {
        return {
            auth: props.auth
        };
    }

    public render() {
        if(!this.state.auth.isAuthenticated) {
            return (
                <Redirect to="/" />
            );
        }

        return (
            <div className="diary-entries-wrapper row justify-content-center">
                <div className="col-8">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Food</th>
                                <th>Hunger</th>
                                <th>Thoughts</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderEntries()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

