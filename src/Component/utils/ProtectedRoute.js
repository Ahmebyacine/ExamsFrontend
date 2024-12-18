import React from 'react';
import { Navigate } from 'react-router-dom';
import { getTokenPayload } from './getTokenPayload';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const tokenPayload = getTokenPayload();

  if (!tokenPayload) {
    return <Navigate to="/login" />;
  }

  const { role } = tokenPayload;

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
