import React from 'react';

export function({ mensagem, limpaMensagem }) {
    return (
        <div
          className="notificacaoMsg"
          onAnimationEnd={limpaMensagem}
        >
          {mensagem}
        </div>
    );
}
