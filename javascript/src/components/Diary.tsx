import React, { MouseEvent } from 'react';
import { IDiaryProps, IDiaryState } from '../interfaces/Diary';
import DiaryEntry from './DiaryEntry';
import HttpService from '../services/Http';
import { IDiaryEntry } from '../interfaces/DiaryEntry';
import UtilService from '../services/Util';
import TableFilter from './TableFilter';

export default class Diary extends React.Component<IDiaryProps, IDiaryState> {
    constructor(props:IDiaryProps) {
        super(props);
        
        this.state = {
            entries: [],
            filters: []
        };

        this.onFilterChange = this.onFilterChange.bind(this);
        this.onCreate = this.onCreate.bind(this);
    }

    private onCreate(e:MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        this.props.history.push("/diary/create");
    }

    private getVisibleEntries() {
        let filter;
        return this.state.entries.filter((entry) => {
            for(let i = 0; i < this.state.filters.length; i++) {
                filter = this.state.filters[i];

                // intentionally using == instead of ===
                if(filter.value == -1) {
                    continue;
                }
                
                // intentionally using == instead of ===
                if(entry[filter.prop as "slot" | "hunger"] != filter.value) {
                    return false;
                }
            }

            return true;
        });
    }

    private renderEntries() {
        let entries = this.getVisibleEntries();
        return entries.map((entry:IDiaryEntry) => {
            return (
                <DiaryEntry entry={entry} key={entry.id} showStatus={this.props.showStatus} {...this.props} />
            );
        });
    }

    private onFilterChange(prop:string, value:any) {
        let filters = [];
        this.state.filters.forEach((filter) => {
            if(filter.prop === prop) {
                return;
            }

            filters.push(filter);
        });

        filters.push({
            prop: prop,
            value: value
        });
        
        this.setState({
            filters: filters
        });
    }

    private async fetch() {
        if(!UtilService.isAuthenticated()) {
            this.props.history.push("/");
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
        return (
            <div className="row diary-entries-wrapper justify-content-center">
                <div className="col-12 controls-wrapper">
                    <button className="btn btn-primary" onClick={this.onCreate}>Create</button>
                </div>
                <table className="col-10">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time
                                <TableFilter prop={"slot"} options={UtilService.getTimeSlots()} onFilterChange={this.onFilterChange} />
                            </th>
                            <th>Food</th>
                            <th>Hunger
                                <TableFilter prop={"hunger"} options={UtilService.getHungerScales()} onFilterChange={this.onFilterChange} />
                            </th>
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

