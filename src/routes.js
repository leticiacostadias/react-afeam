import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/LoginPage';
import Produto from './pages/Produto';

function Roteamento() {
  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/login" component={Login} />
      <Route path="/:categoria/:produto" component={Produto} exact />
      <Route path="*" component={NotFound} />
    </Switch>
  );
}

export default Roteamento;
