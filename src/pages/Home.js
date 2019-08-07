import React, { Component, Fragment } from 'react';

// import Cabecalho from '../components/Cabecalho';
// import NavMenu from '../components/NavMenu';
// import Dashboard from '../components/Dashboard';
// import Widget from '../components/Widget';
// import TrendsArea from '../components/TrendsArea';
// import Tweet from '../components/Tweet';
// import If from '../components/If';

import {
  Cabecalho,
  Tweet,
  Widget,
  Modal,
  NavMenu,
  Dashboard,
  TrendsArea,
  If
} from '../components';

import { NotificaoContext } from './../contexts/NotificacaoContext';
import tweetService from '../services/tweets';

class Home extends Component {
  // constructor () {
  // super();

  // this.handleNovoTweetChange = this.handleNovoTweetChange.bind(this);
  // }

  static contextType = NotificaoContext;

  state = {
    novoTweet: '',
    tweets: [],
    loading: true
  }

  // DEPRECATED_componentWillMount()
  componentDidMount() {
    // buscar os tweets
    tweetService.listaTweets()
      .then(listaDeTweets => {
        console.log(listaDeTweets);

        this.setState({
          tweets: listaDeTweets,
          loading: false
        });
      });
  }

  // componentShouldUpdate()
  // DEPRECATED_componentWillUpdate()
  // componentDidUpdate() {
  //   // console.log('algo mudou')

  //   // if (1 === 2) {
  //   //   this.setState({ novoTweet: '' });
  //   // }
  // }

  // componentWillUnmount() {
  //   console.log('vou morrer');
  // }
  // DEPRECATED_componentDidUnmount()

  handleNovoTweetChange = (evento) => {
    // console.log(this);
    this.setState({ novoTweet: evento.target.value });
  }

  handleCriaTweet = (evento) => {
    evento.preventDefault();

    const { novoTweet, tweets } = this.state;

    // console.log(this.state.novoTweet);
    // this.state.tweets.push(this.state.novoTweet);

    tweetService.criaTweet(novoTweet)
      .then(tweetCriado => {
        // console.log(tweetCriado);

        // spread operator
        this.setState({
          tweets: [tweetCriado, ...tweets],
          novoTweet: ''
        });

        this.context.setMensagem('Novo tweet criado');
      });

    // this.setState({ tweets: this.state.tweets });
  }

  handleExcluirTweet = (idDoTweetExcluido) => {
    const { tweets } = this.state;

    this.setState({
      tweets: tweets
        .filter(item => item._id !== idDoTweetExcluido)
    });
    this.context.setMensagem('Tweet excluído com sucesso');
  }

  novoTweetValido = () => {
    const { length: novoTweetLenght } = this.state.novoTweet;

    return novoTweetLenght > 0 && novoTweetLenght <= 140;
  }

  render() {
    // console.log(this.state.novoTweet);
    // console.log(this.state.tweets);
    const { novoTweet, tweets, loading } = this.state;

    if (loading) return <p>Carregando</p>;

    return (
      <Fragment>
        <Cabecalho>
          <NavMenu usuario="@omariosouto" />
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
              {/* {this.state.tweets.length === 0 ?
                'Tweet alguma coisa!' : (
                <div className="tweetsArea">
                  {this.state.tweets.map((tweet) => (
                    <Tweet
                      nomeUsuario="Felizberto da Silva"
                      usuario="felizberto"
                      avatarURL="https://bit.ly/2YLM3Ii"
                    >
                      {tweet}
                    </Tweet>
                  ))}
                </div>
              )} */}
              { /* truthy */}
              {/* {this.state.tweets.length === 0 && 'Twite alguma coisa!'} */}

              <If condition={tweets.length === 0}>
                Twite alguma coisa!
              </If>

              <div className="tweetsArea">
                {tweets.map(tweet => (
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
                  >
                    {tweet.conteudo}
                  </Tweet>
                ))}
              </div>
            </Widget>
          </Dashboard>
        </div>
        <Modal
          estaAberto={true}
          fechaModal={() => { console.log('fecha o modal!') }}
        >
          conteudo do modal
        </Modal>
      </Fragment>
    );
  }
}

export default Home;
