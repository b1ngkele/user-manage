import { legacy_createStore as createStore, combineReducers } from 'redux';
import { userReducer } from './reducer';

const rootReducer = combineReducers({
  userInfo: userReducer,
});

export const store = createStore(rootReducer);
