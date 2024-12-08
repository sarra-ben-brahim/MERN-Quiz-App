// components/context/ProtectedRoute.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { jwtDecode } from 'jwt-decode';


const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwtDecode(token);
    console.log(decoded.role)
    if (decoded.role !== 'admin') {
      return <Navigate to="/login" />;
    }
  } catch (error) {
    localStorage.removeItem('token');
    return <Navigate to="/login" />;
  }
  
  return children;
};



export default ProtectedRoute;
