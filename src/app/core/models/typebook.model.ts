export interface TypeBook {
    _id?: string,
    name: string
}

export interface TypeBookState{
    readonly typeBook : TypeBook[];
}