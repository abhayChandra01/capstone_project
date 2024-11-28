import React from "react";
import { Navigate } from "react-router-dom";
import { AdminRole } from "../utils/config/navConfig";
import AdminLayout from "../components/Admin/Layout/AdminLayout";
import toast from "react-hot-toast";
import { AdminProvider } from "../context/AdminProvider";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles: AdminRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const user = JSON.parse(localStorage.getItem("admin_user") || "null");

  if (!user || !allowedRoles.includes(user.role)) {
    toast.error("Unauthorized access!");
    localStorage.removeItem("admin_user");
    return <Navigate to="/admin-login" />;
  }

  return (
    <AdminProvider>
      <AdminLayout>{children}</AdminLayout>;
    </AdminProvider>
  );
};

export default ProtectedRoute;
