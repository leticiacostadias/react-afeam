import { combineReducers, createStore } from 'redux';

const stateInicial = {
  lista: [],
  tweetSelecionado: null,
  retweets: {
    ghsdg: ''
  }
};

function tweetsReducer (state = stateInicial, action) {
  // action => atualiza a lista de tweets
  if (action.type === 'tweets/ATUALIZA_LISTA') {
    return {
      ...state,
      lista: action.listaTweets
    };
  } else if (action.type === 'tweets/NOVO_TWEET') {
    return {
      ...state,
      lista: [action.tweetCriado, ...state.lista]
    };
  }

  return state;
}

const store = createStore(
  combineReducers({
    tweets: tweetsReducer
  })
);

// window.store = store;

export default store;
