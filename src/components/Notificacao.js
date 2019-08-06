import React from 'react';

export default function Notificacao ({ mensagem, limpaMensagem }) {
    return (
        <div
          className="notificacaoMsg"
          onAnimationEnd={limpaMensagem}
        >
          {mensagem}
        </div>
    );
}
