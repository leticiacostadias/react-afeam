import React, { Component, Fragment } from 'react'
import Cabecalho from '../../components/Cabecalho'
import Widget from '../../components/Widget'

import './loginPage.css'

class LoginPage extends Component {
  handleLogar = (evento) => {
    evento.preventDefault();

    // pegar usuario e senha
    const login = this.refs.login.value;
    const senha = this.refs.senha.value;

    // testar usuario e senha para logar
    // usar a API
    // fetch -> axios
    fetch('http://api-twitelum.herokuapp.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        login,
        senha
      })
    }).then((resposta) => {
      console.log(resposta.ok);

      return resposta.json();
    }).then(data => console.log(data))
      .catch((err) => {

      });
  }

  render() {
    return (
      <Fragment>
        <Cabecalho />
        <div className="loginPage">
          <div className="container">
            <Widget>
              <h2 className="loginPage__title">Seja bem vindo!</h2>
              <form
                className="loginPage__form"
                onSubmit={this.handleLogar}
              >
                <div className="loginPage__inputWrap">
                  <label className="loginPage__label" htmlFor="login">Login</label>
                  <input ref="login" className="loginPage__input" type="text" id="login" name="login" />
                </div>
                <div className="loginPage__inputWrap">
                  <label className="loginPage__label" htmlFor="senha">Senha</label>
                  <input ref="senha" className="loginPage__input" type="password" id="senha" name="senha" />
                </div>
                <div className="loginPage__errorBox">
                  Mensagem de erro!
                </div>
                <div className="loginPage__inputWrap">
                  <button className="loginPage__btnLogin" type="submit">
                    Logar
                  </button>
                </div>
              </form>
            </Widget>
          </div>
        </div>
      </Fragment>
    )
  }
}


export default LoginPage