import React, { Component, Fragment } from 'react';

import Cabecalho from '../components/Cabecalho'
import NavMenu from '../components/NavMenu'
import Dashboard from '../components/Dashboard'
// import Widget from '../components/Widget'
import TrendsArea from '../components/TrendsArea'
// import Tweet from '../components/Tweet'
import If from '../components/If';

import { Tweet, Widget } from '../components';

class Home extends Component {
  // constructor () {
    // super();

    // this.handleNovoTweetChange = this.handleNovoTweetChange.bind(this);
  // }

  state = {
    novoTweet: '',
    tweets: []
  }

  handleNovoTweetChange = (evento) => {
    // console.log(this);
    this.setState({ novoTweet: evento.target.value });
  }

  handleCriaTweet = (evento) => {
    evento.preventDefault();

    // console.log(this.state.novoTweet);
    // this.state.tweets.push(this.state.novoTweet);

    // spread operator
    this.setState({
      tweets: [ this.state.novoTweet, ...this.state.tweets ],
      novoTweet: ''
    });
    // this.setState({ tweets: this.state.tweets });
  }

  novoTweetValido = () => {
    const { length: novoTweetLenght} = this.state.novoTweet;

    return novoTweetLenght > 0 && novoTweetLenght <= 140;
  }

  render() {
    // console.log(this.state.novoTweet);
    console.log(this.state.tweets);

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
                    {this.state.novoTweet.length}/140
                  </span>
                  <textarea
                    className="novoTweet__editor"
                    placeholder="O que está acontecendo?"
                    onChange={this.handleNovoTweetChange}
                    value={this.state.novoTweet}
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
              { /* truthy */ }
              {/* {this.state.tweets.length === 0 && 'Twite alguma coisa!'} */}

              <If condition={this.state.tweets.length === 0}>
                Twite alguma coisa!
              </If>

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
            </Widget>
          </Dashboard>
        </div>
      </Fragment>
    );
  }
}

export default Home;
