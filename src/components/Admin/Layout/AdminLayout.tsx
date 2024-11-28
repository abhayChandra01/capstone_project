import React, { useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import AdminSidebar from "../Sidebar/AdminSidebar";
import AdminHeader from "../Header/AdminHeader";
import { useAdminContext } from "../../../context/AdminProvider";
import Loading from "../../Shared/Loading/Loading";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { loading, logoutHandler } = useAdminContext();
  const { role } = useParams();

  useEffect(() => {
    const tokenString = localStorage.getItem("admin_user");

    if (!tokenString) {
      logoutHandler();
    }

    const token = tokenString ? JSON.parse(tokenString) : null;

    const isInvalidAccess = token?.role !== role;

    if (isInvalidAccess) {
      logoutHandler();
    }
  }, [location.pathname, role]);

  return (
    <div className="flex h-screen relative">
      <Toaster position="bottom-center" />
      {loading ? <Loading fullscreen={false} /> : null}

      <AdminSidebar />
      <div className="flex flex-col flex-1">
        <AdminHeader />
        <main
          className={`bg-[#F6F3F9] h-[calc(100vh-64px)] overflow-y-auto p-4`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;