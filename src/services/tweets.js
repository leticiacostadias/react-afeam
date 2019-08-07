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

    // fazendo um GET
    return fetch(`http://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${token}`)
      .then(resposta => resposta.json());
  },

  curtirTweet (idDoTweet) {
    const token = localStorage.getItem('token');

    // POST http://twitelum-api.herokuapp.com/tweets/${id}/like?X-AUTH-TOKEN=${token}
    return fetch(`http://twitelum-api.herokuapp.com/tweets/${idDoTweet}/like?X-AUTH-TOKEN=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(resposta => resposta.json());
  },

  excluirTweet(idDoTweet) {
    // DELETE http://twitelum-api.herokuapp.com/tweets/${id}?X-AUTH-TOKEN=${token}
    const token = localStorage.getItem('token');

    return fetch(`http://twitelum-api.herokuapp.com/tweets/${idDoTweet}?X-AUTH-TOKEN=${token}`, {
      method: 'DELETE'
    }).then(resposta => resposta.json());
  }
}

export default TweetService;
