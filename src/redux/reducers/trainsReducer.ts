import { AppState, Train } from '../types/trainsTypes';
import { Action, ActionTypes } from '../actions/trainsActions';

const initialState: AppState = {
    trains: [],
    activeTrainId: null,
};

const trainsReducer = (state: AppState = initialState, action: Action): AppState => {
    switch (action.type) {
        case ActionTypes.LOAD_TRAINS:
            return {
                ...state,
                trains: action.payload,
            };
        case ActionTypes.SELECT_TRAIN:
            return {
                ...state,
                activeTrainId: action.payload,
            };
        case ActionTypes.UPDATE_TRAIN:
            if (state.activeTrainId === null) {
                return state;
            }
            const activeTrainIndex: number = state.activeTrainId;
            const updatedTrains: Train[] = [...state.trains];

            updatedTrains[activeTrainIndex] = {
                ...updatedTrains[activeTrainIndex],
                characteristics: action.payload,
            };
            return {
                ...state,
                trains: updatedTrains,
            };
        default:
            return state;
    }
};

export default trainsReducer;
