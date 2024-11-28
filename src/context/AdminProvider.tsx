import React, { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface AdminContextType {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  logoutHandler: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const logoutHandler = () => {
    localStorage.removeItem("admin_user");
    navigate("/admin-login");
  };

  return (
    <AdminContext.Provider value={{ loading, setLoading, logoutHandler }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdminContext must be used within an admin layout");
  }
  return context;
};
