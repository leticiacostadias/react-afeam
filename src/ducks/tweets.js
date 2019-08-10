import tweetService from '../services/tweets';

export const actionTypes = {
  atualiza: 'tweets/ATUALIZA_LISTA',
  novo: 'tweets/NOVO_TWEET',
  excluir: 'tweets/EXCLUIR_TWEET',
  curtir: 'tweets/CURTIR_TWEET',
  recebe: 'tweets/RECEBE_TWEET'
};

export const ActionCreators = {
  recebeTweet(tweet) {
    return {
      type: actionTypes.recebe,
      novoTweet: tweet
    };
  },

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


export const initialState = {
  lista: [],
  tweetSelecionado: null,
};

export const actionHandler = {
  [actionTypes.atualiza]: (state, action) => ({
    ...state,
    lista: action.listaTweets
  }),

  [actionTypes.novo]: (state, action) => ({
    ...state,
    lista: [action.tweetCriado, ...state.lista]
  }),

  [actionTypes.excluir]: (state, action) => ({
    ...state,
    lista: state.lista
      .filter(tweet => tweet._id !== action.idDoTweetExcluido)
  }),

  [actionTypes.curtir]: (state, action) => {
    const tweetSelecionado = state.lista
      .find(tweet => tweet._id === action.idDoTweetCurtido);

    tweetSelecionado.totalLikes += tweetSelecionado.likeado ? -1 : 1;
    tweetSelecionado.likeado = !tweetSelecionado.likeado

    return {
      ...state,
      lista: [...state.lista]
    };
  },

  [actionTypes.recebe]: (state, action) => ({
    ...state,
    lista: [action.novoTweet, ...state.lista]
  })
};
