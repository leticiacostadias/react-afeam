import React from 'react';

export function Notificacao ({ mensagem, limpaMensagem }) {
    return (
        <div
          className="notificacaoMsg"
          onAnimationEnd={limpaMensagem}
        >
          {mensagem}
        </div>
    );
}
