import { applyMiddleware, combineReducers, createStore } from 'redux';
import Thunk from 'redux-thunk';

import * as tweetsDuck from './ducks/tweets';
import * as loginDuck from './ducks/login';

function createReducer (handler, initialState) {
  return function reducer (state = initialState, action) {
    const { type } = action;
    // console.log(action);

    if (handler[type]) {
      return handler[type](state, action);
    }

    return state;
  };
}

const store = createStore(
  combineReducers({
    tweets: createReducer(tweetsDuck.actionHandler, tweetsDuck.initialState),
    login: createReducer(loginDuck.actionHandler, loginDuck.initialState),
  }),
  applyMiddleware(Thunk)
);

export default store;
