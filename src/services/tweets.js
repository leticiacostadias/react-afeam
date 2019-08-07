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
    }).then(data => console.log(data));
  }
}

export default TweetService;