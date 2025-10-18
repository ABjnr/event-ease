import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../services/AuthContext.jsx";

const AdminRoute = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // It's possible the user data hasn't been loaded yet.
  if (!user) {
    return <div>Loading...</div>; // Or a spinner component
  }

  if (user.role !== "Admin") {
    return <Navigate to="/events" />; // Redirect non-admins to the regular dashboard
  }

  return <Outlet />;
};

export default AdminRoute;
