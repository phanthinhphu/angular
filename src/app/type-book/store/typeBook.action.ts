import { Action } from '@ngrx/store';
import { TypeBook } from '../../core/models/typebook.model';

export const GET_TYPEBOOKS = 'GET_TYPEBOOKS';
export const CREATE_TYPEBOOK = 'TYPE_BOOK';
export const UPDATE_TYPEBOOK = 'UPDATE_TYPEBOOK';
export const DELETE_TYPEBOOK = 'DELETE_TYPEBOOK';

export class getTypeBooks implements Action {
    readonly type = GET_TYPEBOOKS;
    constructor(public payload: TypeBook[]) { }
}

export class createTypeBook implements Action {
    readonly type = CREATE_TYPEBOOK;
    constructor(public payload: TypeBook) { }
}

export class updateTypeBook implements Action {
    readonly type = UPDATE_TYPEBOOK;
    constructor(public payload: TypeBook) { }
}

export class deleteTypeBook implements Action {
    readonly type = DELETE_TYPEBOOK;
    constructor(public payload: TypeBook) { };
}

export type typebookActions = getTypeBooks
    |createTypeBook
    |updateTypeBook
    |deleteTypeBook