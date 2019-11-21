import { Action } from '@ngrx/store';
import { User } from 'src/app/core/models/user.model';


export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export class login implements Action {
    readonly type = LOGIN;
    constructor(public payload: User) { }
}

export class logout implements Action {
    readonly type = LOGOUT;
}

export type loginActions = login | logout;