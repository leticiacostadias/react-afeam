import React from 'react';
import './App.css';

import Cabecalho from './components/Cabecalho';
import NavMenu from './components/NavMenu';

function App () {
  return (
    <div>
      <Cabecalho nomeUsuario={Math.random()}>
        <NavMenu />
      </Cabecalho>
    </div>
  );
}

export default App;
