import React, { createContext, useContext, useState, ReactNode } from "react";
import { Category } from "../model/Category.model";
import toast from "react-hot-toast";

interface AppContextType {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  logoutHandler: () => void;
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  loginModal: boolean;
  openRegisterModal: () => void;
  closeRegisterModal: () => void;
  registerModal: boolean;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  refreshDetails: boolean;
  setRefreshDetails: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const customer_user = localStorage.getItem("customer_user");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loginModal, setLoginModal] = useState<boolean>(false);
  const [registerModal, setRegisterModal] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    customer_user ? true : false
  );
  const [refreshDetails, setRefreshDetails] = useState<boolean>(false);

  const logoutHandler = () => {
    localStorage.removeItem("customer_user");
    toast.success("Logged out successfully!");
    setIsLoggedIn(false);
    setRefreshDetails(true);
  };

  const openLoginModal = () => setLoginModal(true);
  const closeLoginModal = () => setLoginModal(false);

  const openRegisterModal = () => setRegisterModal(true);
  const closeRegisterModal = () => setRegisterModal(false);

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        logoutHandler,
        categories,
        setCategories,
        openLoginModal,
        closeLoginModal,
        loginModal,
        openRegisterModal,
        closeRegisterModal,
        registerModal,
        isLoggedIn,
        setIsLoggedIn,
        refreshDetails,
        setRefreshDetails,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an app layout");
  }
  return context;
};
