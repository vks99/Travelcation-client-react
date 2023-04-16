import { createContext, useState, ReactNode, useEffect } from 'react';
//set AuthContextType - two method login,logout, 1 boolean variable login or not
export type AuthContextType = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  //set islogin in localstorge
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const savedIsLoggedIn = localStorage.getItem('isLoggedIn');
    console.log(savedIsLoggedIn);
    return savedIsLoggedIn ? savedIsLoggedIn === 'true' : false;
  });
  
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn.toString());
  }, [isLoggedIn]);
 //if login set islogin to true
  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };
//if loginout set islogin to false
  const authContextValue = {
    isLoggedIn,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthContextProvider };
