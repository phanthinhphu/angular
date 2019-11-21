import { Action } from '@ngrx/store';
import { Publisher } from '../../core/models/publisher.model';

export const GET_PUBLISHERS = 'GET_PUBLISHERS';
export const CREATE_PUBLISHER = 'CREATE_PUBLISHER';
export const UPDATE_PUBLISHER = 'UPDATE_PUBLISHER';
export const DELETE_PUBLISHER = 'DELETE_PUBLISHER';

export class getPublishers implements Action {
    readonly type = GET_PUBLISHERS;
    constructor(public payload: Publisher[]) { }
}

export class createPublisher implements Action {
    readonly type = CREATE_PUBLISHER;
    constructor(public payload: Publisher) { }
}

export class updatePublisher implements Action {
    readonly type = UPDATE_PUBLISHER;
    constructor(public playload: Publisher) { }
}

export class deletePublisher implements Action {
    readonly type = DELETE_PUBLISHER;
    constructor(public playload: Publisher) { }
}

export type publisherActions = getPublishers
    | createPublisher
    | updatePublisher
    | deletePublisher