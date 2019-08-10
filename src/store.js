import { applyMiddleware, combineReducers, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import Thunk from 'redux-thunk';

import * as tweetsDuck from './ducks/tweets';
import * as loginDuck from './ducks/login';

function createReducer (handler, initialState) {
  return function reducer (state = initialState, action) {
    const { type } = action;

    if (handler[type]) {
      return handler[type](state, action);
    }

    return state;
  };
}

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['login']
};

const rootReducer = combineReducers({
  tweets: createReducer(tweetsDuck.actionHandler, tweetsDuck.initialState),
  login: createReducer(loginDuck.actionHandler, loginDuck.initialState),
});

const store = createStore(
  persistReducer(persistConfig, rootReducer),
  applyMiddleware(Thunk)
);

export default { store, persistor: persistStore(store) };
