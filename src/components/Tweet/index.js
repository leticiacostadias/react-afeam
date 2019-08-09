import React, { Component } from 'react'
import PropTypes from 'prop-types';

import './tweet.css'

class Tweet extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    nomeUsuario: PropTypes.string.isRequired,
    usuario: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    onExcluir: PropTypes.func.isRequired,
    onCurtir: PropTypes.func.isRequired,

    avatarURL: PropTypes.string,
    removivel: PropTypes.bool,
    likeado: PropTypes.bool,
    totalLikes: PropTypes.number,
    onSelecionaTweet: PropTypes.func
  }

  static defaultProps = {
    avatarURL: 'https://bit.ly/1YLVjXx',
    removivel: false,
    likeado: false,
    totalLikes: 0,
    onSelecionaTweet: () => {}
  }

  // state = {
  //   likeado: this.props.likeado,
  //   totalLikes: this.props.totalLikes
  // }

  likeIconClasses = () => {
    const classes = ['icon', 'icon--small', 'iconHeart'];
    const { likeado } = this.props;

    if (likeado) classes.push('iconHeart--active');

    return classes.join(' ');
  }

  handleCurtir = () => {
    const { id, onCurtir } = this.props;

    onCurtir(id);
    // tweetService.curtirTweet(id)
    //   .then(() => {
    //     // console.log(data);
    //     const { likeado, totalLikes } = this.props;

    //     this.setState({
    //       likeado: !likeado,
    //       totalLikes: totalLikes + (likeado ? -1 : 1)
    //     });
    //   });
  }

  handleExcluir = () => {
    const { id, onExcluir } = this.props;

    onExcluir(id);
    // tweetService.excluirTweet(id)
    //   .then(() => {
    // });
  }

  handleSelecionaTweet = ({ target }) => {
    if (target.closest('.tweet__footer')) return;

    // atualizar o estado da Home
    this.props.onSelecionaTweet();
  }

  render() {
    const {
      avatarURL,
      nomeUsuario,
      usuario,
      removivel,
      children
    } = this.props;
    const { totalLikes } = this.props;

    return (
      <article className="tweet" onClick={this.handleSelecionaTweet}>
        <div className="tweet__cabecalho">
          <img
            className="tweet__fotoUsuario"
            src={avatarURL}
            alt=""
          />
          <span className="tweet__nomeUsuario">{nomeUsuario}</span>
          <a href="/"><span className="tweet__userName">
            @{usuario}
          </span></a>
        </div>
        <p className="tweet__conteudo">
          <span>{children}</span>
        </p>
        <footer className="tweet__footer">
          <button className="btn btn--clean" onClick={this.handleCurtir}>
            <svg
              className={this.likeIconClasses()}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 47.5 47.5"
            >
              <defs>
                <clipPath id="a">
                  <path d="M0 38h38V0H0v38z"></path>
                </clipPath>
              </defs>
              <g clipPath="url(#a)" transform="matrix(1.25 0 0 -1.25 0 47.5)">
                <path d="M36.885 25.166c0 5.45-4.418 9.868-9.867 9.868-3.308 0-6.227-1.632-8.018-4.128-1.79 2.496-4.71 4.129-8.017 4.129-5.45 0-9.868-4.418-9.868-9.868 0-.773.098-1.52.266-2.242C2.75 14.413 12.216 5.431 19 2.965c6.783 2.466 16.249 11.448 17.617 19.96.17.721.268 1.47.268 2.241"></path>
              </g>
            </svg>
            {totalLikes}
          </button>
          {removivel && (
            <button className="btn btn--blue btn--remove" onClick={this.handleExcluir}>
              X
            </button>
          )}
        </footer>
      </article>
    )
  }
}

export default Tweet;
