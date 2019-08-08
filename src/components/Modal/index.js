import React from 'react';
import PropTypes from 'prop-types';
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
          {estaAberto && children}
        </Widget>
      </div>
    </div>
  );
};

Modal.propTypes = {
  fechaModal: PropTypes.func.isRequired,
  
  children: PropTypes.node,
  estaAberto: PropTypes.bool,
};

Modal.defaultProps = {
  estaAberto: false,
  children: 'Conteúdo do modal'
};
