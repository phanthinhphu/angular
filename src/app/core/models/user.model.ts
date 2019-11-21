export interface User {
    _id?: string,
    name: string,
    birthDay: Date,
    phone: string,
    email: string,
    token?:string,
    password?: string
}

export interface UserState {
    readonly user: User[];
}