import { Action } from '@ngrx/store';
import { Card } from '../../core/models/card.model';

export const GET_CARDS = 'GET_CARDS';
export const CREATE_CARD = 'CREATE_CARD';
export const UPDATE_CARD = 'UPDATE_CARD';
export const DELETE_CARD = 'DELETE_CARD';

export class getCards implements Action {
    readonly type = GET_CARDS;
    constructor(public payload: Card[]) { }
}

export class createCard implements Action {
    readonly type = CREATE_CARD;
    constructor(public payload: Card) { }
}

export class updateCard implements Action {
    readonly type = UPDATE_CARD;
    constructor(public payload: Card) { }
}

export class deleteCard implements Action {
    readonly type = DELETE_CARD;
    constructor(public payload: Card) { }
}

export type CardActions = getCards
    | createCard
    | updateCard
    | deleteCard