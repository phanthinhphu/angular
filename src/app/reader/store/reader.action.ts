import { Action } from '@ngrx/store';
import { Reader } from 'src/app/core/models/reader.model';

export const GET_READERS = 'GET_READERS';
export const CREATE_READER = 'CREATE_READER';
export const UPDATE_READER = 'UPDATE_READER';
export const DELETE_READER = 'DELETE_READER';

export class getReaders implements Action {
    readonly type = GET_READERS;
    constructor(public payload: Reader[]) { }
}

export class createReader implements Action {
    readonly type = CREATE_READER;
    constructor(public payload: Reader) { }
}

export class updateReader implements Action {
    readonly type = UPDATE_READER;
    constructor(public payload: Reader) { }
}

export class deleteReader implements Action {
    readonly type = DELETE_READER;
    constructor(public payload: Reader) { }
}

export type readerActions = getReaders
    | createReader
    | updateReader
    | deleteReader