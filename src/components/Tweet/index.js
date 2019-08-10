import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types';

import './tweet.css'
import { NotificaoContext } from '../../contexts/NotificacaoContext';

export default function Tweet(props) {
  const [ curtidores, setCurtidores ] = useState([]);
  // const { setMensagem } = useContext(NotificaoContext);

  // console.log(value);

  const {
    id,
    avatarURL,
    nomeUsuario,
    usuario,
    removivel,
    totalLikes,
    likeado,
    children,
    onCurtir,
    onExcluir,
    onSelecionaTweet
  } = props;

  function likeIconClasses() {
    const classes = ['icon', 'icon--small', 'iconHeart'];

    if (likeado) classes.push('iconHeart--active');

    return classes.join(' ');
  }

  function handleCurtir() {
    onCurtir(id);
    setCurtidores([ 'adalberto', ...curtidores ])
  }

  function handleExcluir() { onExcluir(id); }

  function handleSelecionaTweet({ target }) {
    if (target.closest('.tweet__footer')) return;

    onSelecionaTweet();
  }

  return (
    <article className="tweet" onClick={handleSelecionaTweet}>
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

      <p>{curtidores.join(', ')}</p>
      <footer className="tweet__footer">
        <button className="btn btn--clean" onClick={handleCurtir}>
          <svg
            className={likeIconClasses()}
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
          <button className="btn btn--blue btn--remove" onClick={handleExcluir}>
            X
          </button>
        )}
      </footer>
    </article>
  )
}

Tweet.propTypes = {
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

Tweet.defaultProps = {
  avatarURL: 'https://bit.ly/1YLVjXx',
  removivel: false,
  likeado: false,
  totalLikes: 0,
  onSelecionaTweet: () => { }
}
