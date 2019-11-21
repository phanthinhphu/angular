export interface itemReader{
    _id: string,
    name: string
}

export interface Card {
    _id?: string,
    startDate: Date,
    endDate: Date,
    note: string,
    reader: itemReader
}

export interface CardState{
    readonly card : Card;
}