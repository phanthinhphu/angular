import { Author } from '../../core/models/author.model';
import * as authorActions from './author.action';

export function authorReducer(state: Author[] = [], action: authorActions.authorActions): Author[] {

    if (action.type === authorActions.GET_AUTHORS)
        return action.payload;

    if (action.type === authorActions.CREATE_AUTHOR)
        return [...state, action.payload];

    if (action.type === authorActions.DELETE_AUTHOR)
        return state.filter(author => author._id !== action.payload._id);

    if (action.type === authorActions.UPDATE_AUTHOR)
        return state.map(author => {
            if (author._id !== action.payload._id) return author;
            return author = action.payload
        });

    return state;
}
