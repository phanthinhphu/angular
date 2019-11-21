export interface Publisher {
    _id?: string,
    name: string
    address: string,
    email: string
}

export interface PublisherState {
    readonly publisher: Publisher[];
}

