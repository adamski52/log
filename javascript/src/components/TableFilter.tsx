import React, { FormEvent } from 'react';
import { ITableFilterProps, ITableFilterState } from '../interfaces/TableFilter';

export default class TableFilter extends React.Component<ITableFilterProps, ITableFilterState> {

    constructor(props:ITableFilterProps) {
        super(props);

        this.state = {
            options: props.options
        };

        this.onChange = this.onChange.bind(this);
    }

    private onChange(e:FormEvent<HTMLSelectElement>) {
        e.preventDefault();
        this.props.onFilterChange(this.props.prop, e.currentTarget.value);
    }

    private renderOptions() {
        return this.state.options.map((option, index) => {
            return (
                <option key={index} value={option.value}>{option.name}</option>
            );
        });
    }

    public render() {
        return (
            <div className="table-filter-wrapper">
                <select onChange={this.onChange} className="table-filter-wrapper">
                    <option key={-1} value={-1}>Any</option>
                    {this.renderOptions()}
                </select>
            </div>
        );
    }
}

