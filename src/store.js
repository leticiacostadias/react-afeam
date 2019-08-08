import { combineReducers, createStore } from 'redux';

const stateInicial = {
  lista: [],
  tweetSelecionado: null
};

function tweetsReducer (state = stateInicial, action) {
  // action => atualiza a lista de tweets

  return state;
}

const store = createStore(
  combineReducers({
    tweets: tweetsReducer
  })
);

window.store = store;