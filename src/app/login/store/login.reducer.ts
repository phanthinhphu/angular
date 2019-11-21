import { User } from 'src/app/core/models/user.model';
import * as loginActions from '../store/login.action';

export function loginReducer(state: User = null, action: loginActions.loginActions) {

    if (action.type === loginActions.LOGIN) return action.payload;

    if (action.type === loginActions.LOGOUT) return null;

    return state
}