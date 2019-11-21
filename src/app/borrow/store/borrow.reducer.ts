import { Borrow } from 'src/app/core/models/borrow.model';
import * as borrowActions from './borrow.action';

export function borrowReducer(state: Borrow[] = [], action: borrowActions.borrowActions) {

    if (action.type === borrowActions.GET_BORROWS)
        return action.payload;

    if (action.type === borrowActions.CREATE_BORROW)
        return [...state, action.payload]

    if (action.type === borrowActions.DELETE_BORROW)
        return state.filter(borrow => borrow._id !== action.payload._id);

    if (action.type === borrowActions.UPDATE_BORROW)
        return state.map(borrow => {
            if (borrow._id !== action.payload._id) return borrow;
            return action.payload;
        })

}