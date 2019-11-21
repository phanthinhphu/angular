import { User } from './user.model';

export interface Login {
    email: string,
    password: string
}

export interface LoginState {
    readonly login: User
}