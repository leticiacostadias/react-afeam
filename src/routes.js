import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/LoginPage';
import Logout from './pages/Logout';
import Produto from './pages/Produto';

function usuarioEstaLogado () {
  return localStorage.getItem('token');
}

function RotaPrivada (props) {
  if (usuarioEstaLogado()) {
    return <Route {...props} />;
  }

  return <Redirect to="/login" />;
}

function Roteamento() {
  return (
    <Switch>
      <RotaPrivada path="/" component={Home} exact />
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
      <Route path="/:categoria/:produto" component={Produto} exact />
      <Route path="*" component={NotFound} />
    </Switch>
  );
}

export default Roteamento;
