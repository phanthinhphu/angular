import { Action } from '@ngrx/store';
import { Borrow } from 'src/app/core/models/borrow.model';

export const GET_BORROWS = 'GET_BORROWS';
export const CREATE_BORROW = 'CREATE_BORROW';
export const UPDATE_BORROW = 'UPDATE_BORROW';
export const DELETE_BORROW = 'DELETE_BORROW';

export class getBorrows implements Action {
    readonly type = GET_BORROWS;
    constructor(public payload: Borrow[]) { }
}

export class createBorrow implements Action {
    readonly type = CREATE_BORROW;
    constructor(public payload: Borrow) { }
}

export class updateBorrow implements Action {
    readonly type = UPDATE_BORROW;
    constructor(public payload: Borrow) { }
}

export class deleteBorrow implements Action {
    readonly type = DELETE_BORROW;
    constructor(public payload: Borrow) { }
}

export type borrowActions = getBorrows
    | createBorrow
    | updateBorrow
    | deleteBorrow
