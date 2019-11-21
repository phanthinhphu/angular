import { User } from 'src/app/core/models/user.model';
import * as userActions from '../store/user.action';

export function userReducer(state: User[] = [], action: userActions.userActions) {

    if (action.type === userActions.GET_USERS)
        return action.payload;

    if (action.type === userActions.CREATE_USER)
        return [...state, action.payload];

    if (action.type === userActions.DELETE_USER)
        return state.filter(user => user._id !== action.payload._id)

    if (action.type === userActions.UPDATE_USER)
        return state.map(user => {
            if (user._id !== action.payload._id) return user;
            return action.payload._id
        })

}