import { TypeBook } from '../../core/models/typebook.model';
import * as typebookActions from './typeBook.action';

export function typeBookReducer(state: TypeBook[] = [], action: typebookActions.typebookActions): TypeBook[] {
    if (action.type === typebookActions.GET_TYPEBOOKS)
        return action.payload;

    if (action.type === typebookActions.CREATE_TYPEBOOK)
        return [...state, action.payload];

    if (action.type === typebookActions.DELETE_TYPEBOOK)
        return state.filter(tb => tb._id !== action.payload._id)

    if (action.type === typebookActions.UPDATE_TYPEBOOK)
        return state.map(tb => {
            if (tb._id !== action.payload._id) return tb;
            return tb = action.payload;
        });
}