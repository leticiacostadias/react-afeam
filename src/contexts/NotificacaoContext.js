import React, { createContext, useState } from 'react';
import Notificacao from './../components/Notificacao';

export const NotificaoContext = createContext({
  mensagem: '',
  setMensagem() {}
});

// NotificaoContext = {
  // Provider: Component
  // Consumer: Component
// }

export function NotificaoContextProvider ({ children }) {
  const [mensagem, setMensagem] = useState('');

  // setMensagem('ha mudei o estado');

  return (
    <NotificaoContext.Provider value={{ mensagem, setMensagem }}>
      {children}
      {mensagem && 
        <Notificacao
          mensagem={mensagem}
          limpaMensagem={() => setMensagem('')}
        />
      }
      {/* <NotificaoContext.Consumer> */}
          {/* {({ mensagem, setMensagem }) => ( */}
          {/* )} */}
        {/* </NotificaoContext.Consumer> */}
    </NotificaoContext.Provider>
  );
}
