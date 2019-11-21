import * as publisherActions from './publisher.action';
import { Publisher } from 'src/app/core/models/publisher.model';

export function publisherReducer(state: Publisher[]=[], action: publisherActions.publisherActions): Publisher[] {
    
    if (action.type === publisherActions.GET_PUBLISHERS)
        return action.payload;

    if (action.type === publisherActions.CREATE_PUBLISHER)
        return [...state, action.payload];

    if (action.type === publisherActions.DELETE_PUBLISHER)
        return state.filter(p => p._id !== action.playload._id);

    if (action.type === publisherActions.UPDATE_PUBLISHER)
        return state.map(p => {
            if (p._id !== action.playload._id) return p;
            return p = action.playload;
        });

    return state;
}