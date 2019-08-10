import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import {
  Cabecalho,
  Widget,
  NavMenu,
  Dashboard,
  TrendsArea
} from '../components';

import TweetsContainer from '../containers/TweetsContainer';

import { NotificaoContext } from './../contexts/NotificacaoContext';
import { ActionCreators } from '../ducks/tweets';

class Home extends Component {

  static contextType = NotificaoContext;

  state = {
    novoTweet: '',
    loading: true,
  }

  componentDidMount() {
    this.props.dispatch(
      ActionCreators.atualizaTweets()
    ).then(() => {
      this.setState({ loading: false });
    });  
  }

  handleNovoTweetChange = (evento) => {
    this.setState({ novoTweet: evento.target.value });
  }

  handleCriaTweet = (evento) => {
    evento.preventDefault();

    const { novoTweet } = this.state;

    this.props.dispatch(
      ActionCreators.criaTweet(novoTweet)
    ).then((x) => {
      console.log(x);

      this.setState({ novoTweet: '' });
      this.context.setMensagem('Novo tweet criado');
    });
  }

  novoTweetValido = () => {
    const { length: novoTweetLenght } = this.state.novoTweet;

    return novoTweetLenght > 0 && novoTweetLenght <= 140;
  }

  render() {
    const { novoTweet, loading } = this.state;
    const { usuarioTag } = this.props;

    if (loading) return <p>Carregando</p>;

    return (
      <Fragment>
        <Cabecalho>
          <NavMenu usuario={`@${usuarioTag}`} />
        </Cabecalho>
        <div className="container">
          <Dashboard>
            <Widget>
              <form className="novoTweet" onSubmit={this.handleCriaTweet}>
                <div className="novoTweet__editorArea">
                  <span
                    className={`novoTweet__status ${this.novoTweetValido() ? '' : 'novoTweet__status--invalido'}`}
                  >
                    {novoTweet.length}/140
                  </span>
                  <textarea
                    className="novoTweet__editor"
                    placeholder="O que está acontecendo?"
                    onChange={this.handleNovoTweetChange}
                    value={novoTweet}
                  />
                </div>
                <button
                  type="submit"
                  className="novoTweet__envia"
                  disabled={!this.novoTweetValido()}
                >
                  Tweetar
                </button>
              </form>
            </Widget>
            <Widget>
              <TrendsArea />
            </Widget>
          </Dashboard>
          <Dashboard posicao="centro">
            <Widget>
              <TweetsContainer />
            </Widget>
          </Dashboard>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(stateDaStore) {
  return {
    // [nomedaprop]: stateDaStore
    usuarioTag: stateDaStore.login.usuarioTag
  };
}

export default connect(mapStateToProps)(Home);
