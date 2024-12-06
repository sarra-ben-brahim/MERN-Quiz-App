// ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { auth } = useAuth();

  if (!auth.token) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && auth.user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
