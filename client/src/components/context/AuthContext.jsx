// AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("username");
    const userRole = localStorage.getItem("role");

    if (token && userName && userRole) {
      setIsAuthenticated(true);
      setRole(userRole);
      setIsAdmin(userRole === "admin"); // Set isAdmin based on role
    }

    setLoading(false); // Set loading to false once the values are loaded
  }, []);

  // Prevent rendering children while loading
  if (loading) {
    return <div>Loading...</div>;
  }

 // logout
 const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("role");
  setIsAuthenticated(false);
  setRole("");
  setIsAdmin(false); // Reset isAdmin when logging out
};

// login
const login = (userName, token, role) => {
  localStorage.setItem("token", token);
  localStorage.setItem("username", userName);
  localStorage.setItem("role", role);
  setIsAuthenticated(true);
  setRole(role);
  setIsAdmin(role === "admin"); // Set isAdmin based on role
  console.log("AuthProvider - Logged in:", { userName, role, isAdmin: role === "admin" });
};
  return (
    <AuthContext.Provider value={{ isAuthenticated, role, isAdmin ,logout,login}}>
      {children}
    </AuthContext.Provider>
  );
};
