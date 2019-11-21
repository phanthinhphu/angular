export interface Book {
    _id?: string,
    name: string,
    datePublish: Date,
    price: number,
    status?: boolean,
    author: Item,
    typeBooks: Item[],
    publisher: Item
}

export interface NewBook {
    _id?: string,
    name: string,
    datePublish: Date,
    price: number,
    status?: boolean,
    author: string,
    typeBooks: string[],
    publisher: string
}

export interface BookState {
    readonly book: Book[]
}

interface Item {
    _id: string,
    name: string
}
