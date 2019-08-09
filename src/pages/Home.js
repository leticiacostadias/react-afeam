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
  // constructor () {
  // super();

  // this.handleNovoTweetChange = this.handleNovoTweetChange.bind(this);
  // }

  static contextType = NotificaoContext;

  state = {
    novoTweet: '',
    loading: true,
  }

  // DEPRECATED_componentWillMount()
  componentDidMount() {
    // esteja inscrito para receber as atualizações da store
    // window.store.subscribe(() => {
    //   // object destructuring
    //   const { lista } = window.store.getState().tweets;

    //   this.setState({ tweets: lista });
    // });

    // buscar os tweets
    this.props.dispatch(
      ActionCreators.atualizaTweets()
    ).then(() => {
      this.setState({ loading: false });
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

    const { novoTweet } = this.state;

    // console.log(this.state.novoTweet);
    // this.state.tweets.push(this.state.novoTweet);

    this.props.dispatch(
      ActionCreators.criaTweet(novoTweet)
    ).then((x) => {
      console.log(x);

      this.setState({ novoTweet: '' });
      this.context.setMensagem('Novo tweet criado');
    });

    // this.setState({ tweets: this.state.tweets });
  }

  novoTweetValido = () => {
    const { length: novoTweetLenght } = this.state.novoTweet;

    return novoTweetLenght > 0 && novoTweetLenght <= 140;
  }

  render() {
    // console.log(this.state.novoTweet);
    // console.log(this.state.tweets);
    const { novoTweet, loading } = this.state;

    // console.log(this.props.listaTweets);

    if (loading) return <p>Carregando</p>;

    // console.log(tweetSelecionado);

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
              <TweetsContainer />
            </Widget>
          </Dashboard>
        </div>
      </Fragment>
    );
  }
}

export default connect()(Home);
