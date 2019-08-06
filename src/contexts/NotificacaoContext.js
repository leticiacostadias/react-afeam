import React, { createContext, useState } from 'react';

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
    </NotificaoContext.Provider>
  );
}
