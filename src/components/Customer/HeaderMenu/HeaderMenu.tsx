import React, { useEffect, useRef } from "react";
import { IoIosListBox, IoIosLogIn } from "react-icons/io";
import { FaHeart, FaShoppingCart, FaUserPlus } from "react-icons/fa";
import { SlLogout } from "react-icons/sl";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../context/AppProvider";
import useCustomerDetails from "../../../hooks/useCustomerDetails";

interface HeaderMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  wishListCount: number;
  cartCount: number;
}

const HeaderMenu: React.FC<HeaderMenuProps> = ({
  isMenuOpen,
  setIsMenuOpen,
  wishListCount,
  cartCount,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const customerDetails = useCustomerDetails();
  const { openLoginModal, openRegisterModal, logoutHandler, isLoggedIn } =
    useAppContext();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsMenuOpen]);

  if (!isMenuOpen) return null;

  return (
    <motion.div
      ref={menuRef}
      className="absolute z-[1000] mt-2 top-full right-4 w-max bg-white shadow-lg border border-gray-200 px-4 py-6 rounded-lg flex flex-col"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col gap-4 min-w-[170px]">
        <div className="max-w-[170px]">
          <div className="text-lg">
            {isLoggedIn ? `Hey ${customerDetails?.name ?? ""}` : `Your Account`}
          </div>
          <p className="text-xs text-[#4F3267]">
            Access account & manage your orders.
          </p>
        </div>
        {!isLoggedIn ? (
          <>
            <div
              onClick={() => {
                openLoginModal();
                setIsMenuOpen(false);
              }}
              className="cursor-pointer text-gray-700 inline-flex items-center gap-2 transition-all h-full duration-300 hover:text-[#8863FB]"
            >
              <IoIosLogIn />
              Log In
            </div>
            <div
              onClick={() => {
                openRegisterModal();
                setIsMenuOpen(false);
              }}
              className="cursor-pointer text-gray-700 inline-flex items-center gap-2 transition-all h-full duration-300 hover:text-[#8863FB]"
            >
              <FaUserPlus />
              Sign Up
            </div>
          </>
        ) : (
          <>
            <div
              onClick={() => navigate("/orders")}
              className="cursor-pointer text-gray-700 inline-flex items-center gap-2 transition-all h-full duration-300 hover:text-[#8863FB]"
            >
              <IoIosListBox />
              My Orders
            </div>
            <div
              onClick={() => navigate("/wishlist")}
              className="cursor-pointer text-gray-700 flex items-center justify-between transition-all h-full duration-300 hover:text-[#8863FB]"
            >
              <div className="inline-flex items-center gap-2">
                <FaHeart />
                My Wishlist
              </div>
              {wishListCount ? (
                <div className="bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {wishListCount}
                </div>
              ) : null}
            </div>
            <div
              onClick={() => navigate("/cart")}
              className="cursor-pointer text-gray-700 flex items-center justify-between transition-all h-full duration-300 hover:text-[#8863FB]"
            >
              <div className="inline-flex items-center gap-2">
                <FaShoppingCart />
                My Cart
              </div>
              {cartCount ? (
                <div className="bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </div>
              ) : null}
            </div>
            <div
              onClick={logoutHandler}
              className="cursor-pointer text-gray-700 inline-flex items-center gap-2 transition-all h-full duration-300 hover:text-[#8863FB]"
            >
              <SlLogout />
              Logout
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default HeaderMenu;
