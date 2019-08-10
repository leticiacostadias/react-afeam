import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import socketIo from 'socket.io-client';

import { If, Modal, Tweet } from '../components';

import { NotificaoContext } from './../contexts/NotificacaoContext';
import { ActionCreators } from '../ducks/tweets';

class TweetsContainer extends Component {
  static contextType = NotificaoContext;

  state = {
    tweetSelecionado: null
  }

  socket = socketIo('http://localhost:9090');

  componentDidMount() {
    this.socket.emit('connect');

    this.socket.on('newTweet', (mensagem) => {
      console.log('um novo tweet foi criado');
      console.log(mensagem);

      this.props.dispatch(
        ActionCreators.recebeTweet(mensagem)
      );
    });
  }

  componentWillUnmount() {
    this.socket.emit('disconnect');
  }

  handleExcluirTweet = (idDoTweetExcluido) => {
    this.props.dispatch(
      ActionCreators.excluirTweet(idDoTweetExcluido)
    ).then(() => {
      this.setState({ tweetSelecionado: null });
      this.context.setMensagem('Tweet excluído com sucesso');
    });
  }

  handleCurtirTweet = (idDoTweet) => {
    this.props.dispatch(
      ActionCreators.curtirTweet(idDoTweet)
    );
  }

  handleSelecionaTweet = (tweet) => {
    this.setState({ tweetSelecionado: tweet });
  }

  render() {
    const { tweetSelecionado } = this.state;

    return (
      <Fragment>
        <If condition={this.props.listaTweets.length === 0}>
          Twite alguma coisa!
        </If>

        <div className="tweetsArea">
          {this.props.listaTweets.map(tweet => (
            <Tweet
              key={tweet._id}
              id={tweet._id}
              nomeUsuario={`${tweet.usuario.nome} ${tweet.usuario.sobrenome}`}
              usuario={tweet.usuario.login}
              avatarURL={tweet.usuario.foto}
              totalLikes={tweet.totalLikes}
              likeado={tweet.likeado}
              removivel={tweet.removivel}
              onExcluir={this.handleExcluirTweet}
              onCurtir={this.handleCurtirTweet}
              onSelecionaTweet={() => this.handleSelecionaTweet(tweet)}
            >
              {tweet.conteudo}
            </Tweet>
          ))}
        </div>

        <Modal
          estaAberto={Boolean(tweetSelecionado)}
          fechaModal={() => this.setState({ tweetSelecionado: null })}
        >
          {tweetSelecionado && (
            <Tweet
              id={tweetSelecionado._id}
              nomeUsuario={`${tweetSelecionado.usuario.nome} ${tweetSelecionado.usuario.sobrenome}`}
              usuario={tweetSelecionado.usuario.login}
              avatarURL={tweetSelecionado.usuario.foto}
              totalLikes={tweetSelecionado.totalLikes}
              likeado={tweetSelecionado.likeado}
              removivel={tweetSelecionado.removivel}
              onExcluir={this.handleExcluirTweet}
              onCurtir={this.handleCurtirTweet}
            >
              {tweetSelecionado.conteudo}
            </Tweet>
          )}
        </Modal>
      </Fragment>
    );
  }
}

function mapStateToProps (stateDaStore) {
  return {
    listaTweets: stateDaStore.tweets.lista
  };
}

export default connect(mapStateToProps)(TweetsContainer);