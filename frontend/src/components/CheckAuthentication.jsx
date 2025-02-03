import React from "react";
import { useAuthStore } from "../store/authStore.js";
import { Navigate } from "react-router-dom";

const CheckAuthentication = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default CheckAuthentication;
