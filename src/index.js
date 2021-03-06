import React from "react";
import ReactDOM from "react-dom";

// CSSs Globais
// import './styles/index.css';
import "./assets/css/reset.css";
import "./assets/css/container.css";
import "./assets/css/btn.css";
import "./assets/css/icon.css";
import "./assets/css/iconHeart.css";
import "./assets/css/notificacao.css";

import "./assets/css/novoTweet.css";
// import './index.css';

// import Home from "./pages/Home";
import * as serviceWorker from "./serviceWorker";

import { BrowserRouter } from 'react-router-dom';
import Roteamento from './routes';

import { NotificaoContextProvider } from './contexts/NotificacaoContext';

// REDUX
import store from './store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <NotificaoContextProvider>
      <BrowserRouter>
        <Roteamento />
      </BrowserRouter>
    </NotificaoContextProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
