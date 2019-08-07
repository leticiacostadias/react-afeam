const LoginService = {
  logar(login, senha) {
    // fetch -> axios
    return fetch('http://twitelum-api.herokuapp.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        login,
        senha
      })
    }).then(async (resposta) => {
      if (!resposta.ok) {
        const errorObj = {
          status: resposta.status,
          payload: await resposta.json()
        };

        throw errorObj;
      }

      return resposta.json();
    }).then(data => {
      localStorage.setItem('token', data.token);
      return;

      // redirecionar pro feed
      // console.log(this.props);
      // this.props.history.push('/');
    });
  }
};

export default LoginService;
