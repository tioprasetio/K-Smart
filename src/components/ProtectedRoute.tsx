import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode; // Gunakan React.ReactNode sebagai tipe
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const user = localStorage.getItem("user");

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
