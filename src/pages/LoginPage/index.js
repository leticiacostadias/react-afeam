import React, { Component, Fragment } from 'react'
import { Cabecalho, InputField, Widget } from '../../components'

import './loginPage.css'

import loginService from '../../services/login';
import { NotificaoContext } from '../../contexts/NotificacaoContext'

class LoginPage extends Component {
  static contextType = NotificaoContext;

  state = {
    erroMsg: '',
    inputValues: {
      login: '',
      senha: ''
    },
    inputErrors: {
      login: '',
      senha: ''
    }
  }

  handleLogar = (evento) => {
    evento.preventDefault();

    // pegar usuario e senha
    const { login, senha } = this.state.inputValues;

    // testar usuario e senha para logar
    // usar a API
    loginService.logar(login, senha)
      .then(() => {
        this.props.history.push('/');
        this.context.setMensagem('Login realizado com sucesso!');
      })
      .catch((errorObj) => {
        this.setState({
          erroMsg: `${errorObj.status} - ${errorObj.payload.message}`
        });
      });

    // fetch -> axios
    // fetch('http://api-twitelum.herokuapp.com/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     login,
    //     senha
    //   })
    // }).then(async (resposta) => {
    //   if (!resposta.ok) {
    //     const errorObj = {
    //       status: resposta.status,
    //       payload: await resposta.json()
    //     };

    //     throw errorObj;
    //   }

    //   return resposta.json();
    // }).then(data => {
    //   // console.log(data)

    //   // salvar o token
    //   // localStorage, cookie, sessionStorage
    //   localStorage.setItem('token', data.token);

    //   // redirecionar pro feed
    //   // console.log(this.props);
    //   this.props.history.push('/');
    // }).catch((errorObj) => {
    //   this.setState({
    //     erroMsg: `${errorObj.status} - ${errorObj.payload.message}`
    //   });
    // });
  }

  handleInputChange = ({ target }) => {
    const { value, name } = target;

    this.setState({
      inputValues: {
        ...this.state.inputValues,
        [name]: value
      }
    }, () => this.formValidation());
  }

  formValidation = () => {
    const { login, senha } = this.state.inputValues;
    const newInputErrors = {};

    if (!login) {
      // login tem um erro
      newInputErrors.login = 'Campo obrigatório';
    }

    if (!senha || senha.length < 6) {
      // senha tem um erro
      newInputErrors.senha = 'A senha deve ter pelo menos 6 caracteres';
    }

    this.setState({
      inputErrors: newInputErrors
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
                <InputField
                  label="Login"
                  id="login"
                  type="text"
                  value={this.state.inputValues.login}
                  onChange={this.handleInputChange}
                  error={this.state.inputErrors.login}
                />

                <InputField
                  label="Senha"
                  id="senha"
                  type="password"
                  value={this.state.inputValues.senha}
                  onChange={this.handleInputChange}
                  error={this.state.inputErrors.senha}
                />

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