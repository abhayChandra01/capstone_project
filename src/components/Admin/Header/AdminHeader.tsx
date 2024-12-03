import React from "react";
import useAdminDetails from "../../../hooks/useAdminDetails";

const AdminHeader: React.FC = () => {
  const adminDetails = useAdminDetails();

  return (
    <header className="h-16 bg-white text-black flex items-center px-4 border-b border-gray-300">
      <h1 className="text-lg font-semibold uppercase">
        {adminDetails?.role} Dashboard
      </h1>
    </header>
  );
};

export default AdminHeader;
