export interface Borrow {
    _id?: string,
    startDate: Date,
    endDate: Date,
    user: Item,
    card: Item,
    books: Item[],
    note: string,
    status: boolean,
}

export interface BorrowState{
    readonly borrow: Borrow[]
}

 export interface Item{
    _id: string,
    name: string
}

export interface ItemCard{
    _id: string,
    reader: Item
}

export interface ComboboxBook{
    _id: string,
    name: string,
    checked: boolean
}