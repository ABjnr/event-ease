import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/AuthContext.jsx";

const LogoutPage = () => {
  const { logout, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      logout();
      navigate("/login");
    }
  }, [logout, navigate, loading]);

  return <div>Logging you out...</div>;
};

export default LogoutPage;
