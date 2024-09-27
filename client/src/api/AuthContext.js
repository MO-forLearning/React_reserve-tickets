import { useState, useEffect, createContext } from "react";

export const LoggedInContext = createContext(false);
export const AuthContext = createContext(["", ()=>{}]);

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [authInfo, setAuthInfo] = useState("");

  useEffect(() => {
    if (localStorage.getItem('ticket_authInfo')) {
      let info = localStorage.getItem('ticket_authInfo')
      info = JSON.parse(info)
      setLoggedIn(true)
      setAuthInfo(info)
    }
  }, [])

  return (
    <>
      <LoggedInContext.Provider value={[loggedIn, setLoggedIn]}>
        <AuthContext.Provider value={[authInfo, setAuthInfo]}>
          {children}
        </AuthContext.Provider>
      </LoggedInContext.Provider>
    </>
  );
};
