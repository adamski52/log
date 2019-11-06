export interface IDiaryEntry {
    id: number;
    date: Date;
    slot: number;
    food: string;
    thoughts: string;
    hunger: number;
}

export interface IDiaryEntryProps {
    entry: IDiaryEntry;
}

export interface IDiaryEntryState {
    entry: IDiaryEntry;
}
