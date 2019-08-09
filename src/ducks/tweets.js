import tweetService from '../services/tweets';

export const actionTypes = {
  atualiza: 'tweets/ATUALIZA_LISTA',
  novo: 'tweets/NOVO_TWEET',
  // novo action type
};

export const ActionCreators = {
  atualizaTweets() {
    // service
    return dispatch => {
      return tweetService.listaTweets()
        .then(listaTweets => {
          dispatch({
            type: actionTypes.atualiza,
            listaTweets
          });
        })
    }
  },

  criaTweet(novoTweet) {
    return dispatch => {
      return tweetService.criaTweet(novoTweet)
        .then(tweetCriado => {
          dispatch({
            type: actionTypes.novo,
            tweetCriado
          });

          return tweetCriado;
        }).catch(() => {
          dispatch({
            type: 'request/ERRO',
            erro: 'A API explodiu'
          });
        });
    }
  },

  // criar nova action creator
};


const stateInicial = {
  lista: [],
  tweetSelecionado: null,
};

export function tweetsReducer (state = stateInicial, action) {
  // action => atualiza a lista de tweets
  switch (action.type) {
      case actionTypes.atualiza:
          return {
              ...state,
              lista: action.listaTweets
          };
  
      case actionTypes.novo:
          return {
              ...state,
              lista: [action.tweetCriado, ...state.lista]
          };

      // novo reduce handler

      default: 
          return state;
  }
}
