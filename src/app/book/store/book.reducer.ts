import * as bookActions from './book.action';
import { Book } from 'src/app/core/models/book.model';

export function bookReducer(state: Book[] = [], action: bookActions.bookActions): Book[] {

    if (action.type === bookActions.GET_BOOKS)
        return action.payload;

    if (action.type === bookActions.CREATE_BOOK)
        return [...state, action.payload];

    if (action.type === bookActions.DELETE_BOOK)
        return state.filter(book => book._id !== action.payload._id)

    if (action.type === bookActions.UPDATE_BOOK)
        return state.map(book => {
            if (book._id !== action.payload._id) return book;
            return book = action.payload;
        })
}