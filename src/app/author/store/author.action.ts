import { Action } from '@ngrx/store';
import { Author } from '../../core/models/author.model';


export const GET_AUTHORS = 'GET_AUTHORS';
export const CREATE_AUTHOR = 'CREATE_AUTHOR';
export const UPDATE_AUTHOR = 'UPDATE_AUTHOR';
export const DELETE_AUTHOR = 'DELETE_AUTHOR';

export class getAuthors implements Action {
    readonly type = GET_AUTHORS;
    constructor(public payload: Author[]) { }
}

export class createAuthor implements Action {
    readonly type = CREATE_AUTHOR;
    constructor(public payload: Author) { }
}

export class updateAuthor implements Action {
    readonly type = UPDATE_AUTHOR;
    constructor(public payload: Author) { }
}

export class deleteAuthor implements Action {
    readonly type = DELETE_AUTHOR;
    constructor(public payload: Author) { }
}

export type authorActions = getAuthors
    | createAuthor
    | updateAuthor
    | deleteAuthor;