import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode; // Accepts any React node
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const user = sessionStorage.getItem("user");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>; // Wrap children in a fragment to return valid JSX
};

export default ProtectedRoute;



