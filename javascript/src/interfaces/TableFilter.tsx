export interface ITableFilterProps {
    prop: string;
    onFilterChange: (prop:string, value:any) => void;
    options: any[];
}

export interface ITableFilterState {
    options: any[];
}