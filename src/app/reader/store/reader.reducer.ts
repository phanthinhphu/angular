import * as readerActions from './reader.action';
import { Reader } from 'src/app/core/models/reader.model';

export function readerReducer(state: Reader[]=[],action: readerActions.readerActions): Reader[]{
    
    if(action.type === readerActions.GET_READERS)
        return action.payload;
    
    if(action.type === readerActions.CREATE_READER)
        return [...state,action.payload];

    if(action.type === readerActions.DELETE_READER)
        return state.filter(reader=> reader._id !== action.payload._id);
    
    if(action.type === readerActions.UPDATE_READER)
    return state.map(reader=>{
        if(reader._id !== action.payload._id) return reader;
        return reader = action.payload;
    });

    return state;
}