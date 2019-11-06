import React from 'react';
import { IDiaryProps, IDiaryState } from '../interfaces/Diary';
import DiaryEntry from './DiaryEntry';

export default class Diary extends React.Component<IDiaryProps, IDiaryState> {
    private renderEntries() {
        return this.state.entries.map((entry) => {
            return (
                <DiaryEntry entry={entry} />
            );
        });
    }

    public render() {
        return (
            <div>
                {this.renderEntries()}
            </div>
        );
    }
}

