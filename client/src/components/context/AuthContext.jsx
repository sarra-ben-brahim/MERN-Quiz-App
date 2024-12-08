import React, { createContext, useState, useEffect } from "react";

// Create Context
export const AuthContext = createContext();

// Provider Component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");


  useEffect(() => {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("username");
    const firstName = localStorage.getItem("firstName");
    if (token) {
      setIsAuthenticated(true);
      setUsername(userName);
      setFirstName(firstName);
    }
  }, []);

  // logout AuthProvider
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("firstName");
    setIsAuthenticated(false);
    setUsername("");
  };

  //login
  const login = (userName, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", userName);
    localStorage.setItem("firstName", firstName)
    setIsAuthenticated(true);
    setUsername(userName);
    setFirstName(firstName);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, firstName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
