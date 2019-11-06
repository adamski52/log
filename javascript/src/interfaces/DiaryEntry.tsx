export interface IDiaryEntry {
    id: number;
    date: Date;
    slot: number;
    food: string;
    thoughts: string;
    hunger: number;
}

export interface IDiaryEntryResult extends IDiaryEntry {
    isTemplate?: boolean;
}

export interface IDiaryEntryProps {
    entry: IDiaryEntry;
    disabled?: boolean;
    isTemplate?: boolean;
}

export interface IDiaryEntryState {
    entry: IDiaryEntry;
    disabled: boolean;
    isTemplate: boolean;
}
