import React from "react";
import { Navigate } from "react-router-dom";

const ProtectRouter = ({ children, requiredRole }) => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  // 🚫 No token → redirect to login
  if (!token && !role) {
    return <Navigate to="/login" replace />;
  }

  // ✅ If admin → allow access to everything
  if (role === "admin") {
    return children;
  }

  // 🧠 If route requires a specific role and doesn't match
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  // ✅ Otherwise allow
  return children;
};

export default ProtectRouter;
