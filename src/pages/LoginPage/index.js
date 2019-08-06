import React, { Component, Fragment } from 'react'
import { Cabecalho, Widget } from '../../components'

import './loginPage.css'

class LoginPage extends Component {
  state = {
    erroMsg: ''
  }

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
      // console.log(data)

      // salvar o token
      // localStorage, cookie, sessionStorage
      localStorage.setItem('token', data.token);

      // redirecionar pro feed
      // console.log(this.props);
      this.props.history.push('/');
    }).catch((errorObj) => {
      this.setState({
        erroMsg: `Status: ${errorObj.status}. ${errorObj.payload.message}`
      });
    });
  }

  render() {
    const { erroMsg } = this.state;

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
                {erroMsg && (
                  <div className="loginPage__errorBox">
                    {erroMsg}
                  </div>
                )}
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