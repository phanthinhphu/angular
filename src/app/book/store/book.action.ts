import { Action } from '@ngrx/store';
import { Book } from 'src/app/core/models/book.model';

export const GET_BOOKS = 'GET_BOOKS';
export const CREATE_BOOK = 'CREATE_BOOK';
export const UPDATE_BOOK = 'UPDATE_BOOK';
export const DELETE_BOOK = 'DELETE_BOOK';

export class getBooks implements Action {
    readonly type = GET_BOOKS;
    constructor(public payload: Book[]) { }
}

export class createBook implements Action {
    readonly type = CREATE_BOOK;
    constructor(public payload: Book) { }
}

export class updateBook implements Action {
    readonly type = UPDATE_BOOK;
    constructor(public payload: Book) { }
}

export class deleteBook implements Action {
    readonly type = DELETE_BOOK;
    constructor(public payload: Book) { }
}

export type bookActions = getBooks
    | createBook
    | updateBook
    | deleteBook