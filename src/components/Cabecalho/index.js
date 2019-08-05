import React from 'react';

import './cabecalho.module.css';

class Cabecalho extends React.Component {
  render() {
    return (
      // html, estrutura do componente
      <header className="Cabecalho">
        <h1>Twitelum</h1>

        <a href="#">@{this.props.nomeUsuario}</a>
        <div className="Cabecalho__nav">
          {this.props.children}
        </div>
      </header>
    );
  }
}

export default Cabecalho;
