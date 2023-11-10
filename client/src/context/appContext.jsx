import { useState, createContext } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState({
    user: null,
  });

  return (
    <AppContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </AppContext.Provider>
  );
};
