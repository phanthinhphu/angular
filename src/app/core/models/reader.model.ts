export interface Reader {
    _id? : string,
    name: string,
    address: string,
    birthDay: Date,
    phone: string
}

export interface ReaderState{
    readonly reader : Reader[];
}