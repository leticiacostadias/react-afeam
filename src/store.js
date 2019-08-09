import { applyMiddleware, combineReducers, createStore } from 'redux';
import Thunk from 'redux-thunk';

import { tweetsReducer } from './ducks/tweets';

const store = createStore(
  combineReducers({
    tweets: tweetsReducer
  }),
  applyMiddleware(Thunk)
);

// window.store = store;

export default store;
