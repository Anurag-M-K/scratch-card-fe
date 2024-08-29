import React, { ReactNode } from 'react';
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRouteStore: React.FC<ProtectedRouteProps> = ({ children }) => {
  let location = useLocation();
  const token = localStorage.getItem('accessToken')

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRouteStore;
