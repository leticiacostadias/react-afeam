const LoginService = {
  logar(login, senha) {
    return fetch('http://api-twitelum.herokuapp.com/login', {
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
    });
  }
};

export default LoginService;
