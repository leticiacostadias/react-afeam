import React, { createContext, useState } from 'react';
import Notificacao from './../components/Notificacao';

export const NotificaoContext = createContext({
  mensagem: '',
  setMensagem() {}
});

export function NotificaoContextProvider ({ children }) {
  const [mensagem, setMensagem] = useState('');

  return (
    <NotificaoContext.Provider value={{ mensagem, setMensagem }}>
      {children}
      {mensagem && 
        <Notificacao
          mensagem={mensagem}
          limpaMensagem={() => setMensagem('')}
        />
      }
    </NotificaoContext.Provider>
  );
}
