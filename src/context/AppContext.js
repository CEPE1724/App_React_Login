import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [idUsuario, setIdUsuario] = useState(null);
  const [username, setUsername] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [idEmpresa, setIdEmpresa] = useState(null);

  return (
    <AppContext.Provider value={{
      isLoading, setIsLoading,
      isLoggedIn, setIsLoggedIn,
      idUsuario, setIdUsuario,
      username, setUsername,
      empresa, setEmpresa,
      idEmpresa, setIdEmpresa
    }}>
      {children}
    </AppContext.Provider>
  );
};
