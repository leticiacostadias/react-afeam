import React from 'react';
import { Widget } from '../.'; 

import './modal.css';

export default function Modal ({ children, estaAberto, fechaModal }) {
  function handleFechaModal ({ target }) {
    if (target.closest('.modal__conteudo')) return;

    fechaModal();
  }

  return (
    <div
      className={`modal ${estaAberto && 'modal--active'}`}
      onClick={handleFechaModal}
    >
      <div className="modal__conteudo">
        <Widget>
          {children}
        </Widget>
      </div>
    </div>
  );
};
