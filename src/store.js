import { combineReducers, createStore } from 'redux';

import tweetsReducer from './reducers/tweets';

const store = createStore(
  combineReducers({
    tweets: tweetsReducer
  })
);

// window.store = store;

export default store;
