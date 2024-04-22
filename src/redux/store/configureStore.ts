import { legacy_createStore as createStore, Store } from 'redux';
import rootReducer from '../reducers/trainsReducer';

import { AppState } from '../types/trainsTypes';

const store: Store<AppState> = createStore(rootReducer);
export default store;
