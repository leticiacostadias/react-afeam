import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';

import { Cabecalho, InputField, Widget } from '../../components'
import './loginPage.css'

import { NotificaoContext } from '../../contexts/NotificacaoContext'
import { actionCreators } from '../../ducks/login';

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

    const { login, senha } = this.state.inputValues;

    this.props.dispatch(
      actionCreators.logar(login, senha)
    ).then(() => {
      this.props.history.push('/');
      this.context.setMensagem('Login realizado com sucesso!');
    }).catch((errorObj) => {
      this.setState({
        erroMsg: `${errorObj.status} - ${errorObj.payload.message}`
      });
    });
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
      newInputErrors.login = 'Campo obrigatório';
    }

    if (!senha || senha.length < 6) {
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

export default connect()(LoginPage);
