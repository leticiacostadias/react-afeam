const TweetService = {
  criaTweet (novoTweet) {
    const token = localStorage.getItem('token');

    return fetch(`http://localhost:8080/tweets?X-AUTH-TOKEN=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        conteudo: novoTweet
      })
    }).then(resposta => resposta.json());
  },

  listaTweets () {
    const token = localStorage.getItem('token');

    return fetch(`http://localhost:8080/tweets?X-AUTH-TOKEN=${token}`)
      .then(resposta => resposta.json());
  },

  curtirTweet (idDoTweet) {
    const token = localStorage.getItem('token');

    return fetch(`http://localhost:8080/tweets/${idDoTweet}/like?X-AUTH-TOKEN=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(resposta => resposta.json());
  },

  excluirTweet(idDoTweet) {
    const token = localStorage.getItem('token');

    return fetch(`http://localhost:8080/tweets/${idDoTweet}?X-AUTH-TOKEN=${token}`, {
      method: 'DELETE'
    }).then(resposta => resposta.json());
  }
}

export default TweetService;
