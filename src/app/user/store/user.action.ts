import { Action } from '@ngrx/store';
import { User } from 'src/app/core/models/user.model';

export const GET_USERS = 'GET_USERS';;
export const CREATE_USER = 'CREATE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';

export class getUsers implements Action {
    readonly type = GET_USERS;
    constructor(public payload: User[]) { }
}

export class createUser implements Action {
    readonly type = CREATE_USER;
    constructor(public payload: User) { }
}

export class updateUser implements Action {
    readonly type = UPDATE_USER;
    constructor(public payload: User) { }
}

export class deleteUser implements Action {
    readonly type = DELETE_USER;
    constructor(public payload: User) { }
}

export type userActions = getUsers
    | createUser
    | updateUser
    | deleteUser