import tweetService from '../services/tweets';

export function atualizaTweets() {
  // service
  return (dispatch) => {
    return tweetService.listaTweets()
      .then(listaTweets => {
        dispatch({
          type: 'tweets/ATUALIZA_LISTA',
          listaTweets
        });
      })
  }
}

export function criaTweet(novoTweet) {
  return dispatch => {
    return tweetService.criaTweet(novoTweet)
      .then(tweetCriado => {
        dispatch({
          type: 'tweets/NOVO_TWEET',
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
}
