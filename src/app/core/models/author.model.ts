export interface Author {
    _id?: string,
    name: string
    note?: string,
    nativeCountry?: string,
    penName?: string,
    birthDay: Date
}

export interface AuthorState {
    readonly author: Author[];
}

export interface AuthorResponse{
    status: number,
    success: boolean,
    authors?: Author[],
    author?: Author,
    
}