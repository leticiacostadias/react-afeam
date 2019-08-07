const TweetService = {
  criaTweet (novoTweet) {
    const token = localStorage.getItem('token');

    // POST http://api-twitelum.herokuapp.com/tweets?X-AUTH-TOKEN=${}
    return fetch(`http://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        conteudo: novoTweet
      })
    }).then((resposta) => {
      console.log(resposta);

      return resposta.json();
    });
  },

  listaTweets () {
    const token = localStorage.getItem('token');

    return fetch(`http://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${token}`)
      .then(resposta => resposta.json());
  },

  curtirTweet () {
    // POST http://twitelum-api.herokuapp.com/tweets/${id}/like?X-AUTH-TOKEN=${token}
  }
}

export default TweetService;