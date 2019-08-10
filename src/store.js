import { applyMiddleware, combineReducers, createStore } from 'redux';
import Thunk from 'redux-thunk';

import { actionHandler, tweetsInitialState } from './ducks/tweets';

function createReducer (handler, initialState) {
  return function reducer (state = initialState, action) {
    const { type } = action;
    console.log(action);

    if (handler[type]) {
      return handler[type](state, action);
    }

    return state;
  };
}


const store = createStore(
  combineReducers({
    tweets: createReducer(actionHandler, tweetsInitialState),
  }),
  applyMiddleware(Thunk)
);

export default store;
