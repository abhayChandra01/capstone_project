import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";
import Header from "../Header/Header";
import { useAppContext } from "../../../context/AppProvider";
import { getCategoriesAPI } from "../../../services/customer/Category.service";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import Loading from "../../Shared/Loading/Loading";
import { useQuery } from "@tanstack/react-query";

interface LayoutProps {
  children: React.ReactNode;
}

const STALE_TIME_FIVE_MINUTES = 5 * 60 * 1000;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { loading, setLoading, setCategories, loginModal, registerModal } =
    useAppContext();

  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategoriesAPI,
    staleTime: STALE_TIME_FIVE_MINUTES,
  });

  if (isError) {
    toast.error("An error occurred! Please try again.");
  }

  useEffect(() => {
    if (categories) {
      setCategories(categories);
    }
  }, [categories]);

  return (
    <div className="flex h-screen">
      <Toaster position="bottom-center" />

      {isLoading || loading ? <Loading fullscreen={true} /> : null}

      {loginModal ? <LoginModal /> : null}

      {registerModal ? <RegisterModal /> : null}

      <div className="flex flex-col flex-1">
        <Header />
        <main className={`bg-[#F6F3F9] h-[calc(100vh-64px)] overflow-y-auto`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
