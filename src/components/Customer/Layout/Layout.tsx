import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import Header from "../Header/Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Toaster position="bottom-center" />

      <div className="flex flex-col flex-1">
        <Header />
        <main
          className={`bg-[#F6F3F9] h-[calc(100vh-64px)] overflow-y-auto p-4`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
