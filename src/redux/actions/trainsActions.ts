import { Characteristic, Train } from '../types/trainsTypes';

export enum ActionTypes {
    LOAD_TRAINS = 'LOAD_TRAINS',
    SELECT_TRAIN = 'SELECT_TRAIN',
    UPDATE_TRAIN = 'UPDATE_TRAIN',
}

export interface LoadTrainsAction {
    type: ActionTypes.LOAD_TRAINS;
    payload: Train[];
}

export interface SelectTrainAction {
    type: ActionTypes.SELECT_TRAIN;
    payload: number;
}

export interface UpdateTrainAction {
    type: ActionTypes.UPDATE_TRAIN;
    payload: Characteristic[],
}

export type Action = LoadTrainsAction | SelectTrainAction | UpdateTrainAction;
