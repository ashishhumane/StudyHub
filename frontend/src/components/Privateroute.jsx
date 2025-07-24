import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = Boolean(localStorage.getItem('token')); // Or your actual auth check

  if (!isAuthenticated) {
    return <Navigate
      to="/auth"
      replace
      state={{ from: location.pathname, message: 'You need to login first' }}
    />;
  }

  return children;
};

export default ProtectedRoute;
