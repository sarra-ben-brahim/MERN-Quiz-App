import React, { createContext, useState, useEffect } from "react";

// Create Context
export const AuthContext = createContext();

// Provider Component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("username");
    if (token) {
      setIsAuthenticated(true);
      setUsername(userName);
    }
  }, []);

  // logout AuthProvider
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsAuthenticated(false);
    setUsername("");
  };

  //login
  const login = (userName, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", userName);
    setIsAuthenticated(true);
    setUsername(userName);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
