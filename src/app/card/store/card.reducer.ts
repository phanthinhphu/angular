import { Card } from '../../core/models/card.model';
import * as cardActions from './card.action';

export function cardReducer(state: Card[]=[], action: cardActions.CardActions): Card[] {
    
    if (action.type === cardActions.GET_CARDS)
        return action.payload;

    if (action.type === cardActions.CREATE_CARD)
        return [...state, action.payload];

    if (action.type === cardActions.DELETE_CARD)
        return state.filter(card=>card._id !== action.payload._id);

    if (action.type === cardActions.UPDATE_CARD)
        return state.map(card => {
            if (card._id !== action.payload._id) return card;
            return card = action.payload;
        })
    return state;
}