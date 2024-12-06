import React, { createContext, useState, useContext } from "react";
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwtDecode(token);
      return { token, user };
    }
    return { token: null, user: null };
  });

  const login = (token) => {
    const user = jwtDecode(token); // Decode token to get user info
    localStorage.setItem("token", token); // Store token securely
    setAuth({ token, user });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({ token: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
