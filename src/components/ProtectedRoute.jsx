import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  console.log(children);

  const location = useLocation();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (role && currentUser.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default ProtectedRoute;
