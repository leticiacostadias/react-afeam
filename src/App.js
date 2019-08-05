import React, { Component, Fragment } from 'react';

import Cabecalho from './components/Cabecalho'
import NavMenu from './components/NavMenu'
import Dashboard from './components/Dashboard'
import Widget from './components/Widget'
import TrendsArea from './components/TrendsArea'
import Tweet from './components/Tweet'

class App extends Component {
  // constructor () {
    // super();
    
    // this.handleNovoTweetChange = this.handleNovoTweetChange.bind(this);
  // }

  state = {
    novoTweet: ''
  }

  handleNovoTweetChange = (evento) => {
    // console.log(this);
    this.setState({ novoTweet: evento.target.value });
  }

  novoTweetValido = () => {
    return this.state.novoTweet.length > 0 && this.state.novoTweet.length <= 140
  }

  render() {
    // console.log(this.state.novoTweet);

    return (
      <Fragment>
        <Cabecalho>
          <NavMenu usuario="@omariosouto" />
        </Cabecalho>
        <div className="container">
          <Dashboard>
            <Widget>
              <form className="novoTweet">
                <div className="novoTweet__editorArea">
                  <span className={`novoTweet__status ${this.novoTweetValido() ? '' : 'novoTweet__status--invalido'}`}>{this.state.novoTweet.length}/140</span>
                  <textarea
                    className="novoTweet__editor"
                    placeholder="O que está acontecendo?"
                    onChange={this.handleNovoTweetChange}
                  />
                </div>
                <button type="submit" className="novoTweet__envia">Tweetar</button>
              </form>
            </Widget>
            <Widget>
              <TrendsArea />
            </Widget>
          </Dashboard>
          <Dashboard posicao="centro">
            <Widget>
              <div className="tweetsArea">
                <Tweet
                  nomeUsuario="Felizberto da Silva"
                  usuario="felizberto"
                  avatarURL="https://bit.ly/2YLM3Ii"
                >
                  Hoje é dia de maldade!
                </Tweet>
              </div>
            </Widget>
          </Dashboard>
        </div>
      </Fragment>
    );
  }
}

export default App;
