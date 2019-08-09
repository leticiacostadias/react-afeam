import tweetService from '../services/tweets';

export const actionTypes = {
  atualiza: 'tweets/ATUALIZA_LISTA',
  novo: 'tweets/NOVO_TWEET',

  // novo action type
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
      case actionTypes.excluir:
        return {
          ...state,
          lista: state.lista
            .filter(tweet => tweet._id !== action.idDoTweetExcluido)
        };
      
      case actionTypes.curtir:
        // encontrar o tweet curtido
        const tweetSelecionado = state.lista
          .find(tweet => tweet._id === action.idDoTweetCurtido);

        // alterar likeado e totalLikes
        tweetSelecionado.totalLikes += tweetSelecionado.likeado ? -1 : 1;
        tweetSelecionado.likeado = !tweetSelecionado.likeado

        // QUEBRA
        // tweetSelecionado = {
        //   ...tweetSelecionado,
        //   likeado: !tweetSelecionado.likeado,
        //   totalLikes: tweetSelecionado.totalLikes + (tweetSelecionado.likeado ? -1 : 1)
        // };
        // atualizar o state
        return {
          ...state,
          lista: [...state.lista]
          // atualizar a lista de tweets
        };

      default: 
          return state;
  }
}
