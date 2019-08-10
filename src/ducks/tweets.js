import tweetService from '../services/tweets';

export const actionTypes = {
  atualiza: 'tweets/ATUALIZA_LISTA',
  novo: 'tweets/NOVO_TWEET',
  excluir: 'tweets/EXCLUIR_TWEET',
  curtir: 'tweets/CURTIR_TWEET'
};

export const ActionCreators = {
  atualizaTweets() {
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

  excluirTweet(idDoTweetExcluido) {
    return dispatch => {
      return tweetService.excluirTweet(idDoTweetExcluido)
        .then(() => {
          dispatch({
            type: actionTypes.excluir,
            idDoTweetExcluido
          });
        })
    }
  },

  curtirTweet(idDoTweetCurtido) {
    return dispatch => {
      return tweetService.curtirTweet(idDoTweetCurtido)
        .then(() => {
          dispatch({
            type: actionTypes.curtir,
            idDoTweetCurtido
          });
        })
    }
  }
};


const stateInicial = {
  lista: [],
  tweetSelecionado: null,
};

export function tweetsReducer (state = stateInicial, action) {
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

      case actionTypes.excluir:
        return {
          ...state,
          lista: state.lista
            .filter(tweet => tweet._id !== action.idDoTweetExcluido)
        };
      
      case actionTypes.curtir:
        const tweetSelecionado = state.lista
          .find(tweet => tweet._id === action.idDoTweetCurtido);

        tweetSelecionado.totalLikes += tweetSelecionado.likeado ? -1 : 1;
        tweetSelecionado.likeado = !tweetSelecionado.likeado

        return {
          ...state,
          lista: [...state.lista]
        };

      default: 
          return state;
  }
}
