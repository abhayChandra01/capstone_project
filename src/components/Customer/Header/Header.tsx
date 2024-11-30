import React, { useState } from "react";
import { FaHeart, FaShoppingCart, FaUser, FaUserPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import CategorySection from "../CategorySection/CategorySection";
import { useAppContext } from "../../../context/AppProvider";
import useCustomerDetails from "../../../hooks/useCustomerDetails";
import { IoIosListBox, IoIosLogIn } from "react-icons/io";
import { SlLogout } from "react-icons/sl";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const { openLoginModal, openRegisterModal, isLoggedIn, logoutHandler } =
    useAppContext();
  const navigate = useNavigate();
  const customerDetails = useCustomerDetails();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleMouseEnter = (item: string) => setHoveredItem(item);
  const handleMouseLeave = () => setHoveredItem(null);

  return (
    <header className="h-[100px] w-screen bg-white text-black flex gap-10 items-center justify-between px-10 border-b border-gray-300">
      <div className="flex items-center gap-10 h-full">
        <div
          onClick={() => navigate("/")}
          className="text-xl font-bold cursor-pointer"
        >
          CW
        </div>

        <CategorySection />
      </div>
      <div className="hidden lg:flex items-center gap-2 xl:gap-5 h-full relative">
        <motion.div
          className="relative flex items-center transition-all h-full duration-300 hover:scale-105 hover:text-[#8863FB] hover:tracking-wide cursor-pointer px-2"
          whileHover={{ scale: 1.05 }}
          onMouseEnter={() => handleMouseEnter("user")}
          onMouseLeave={handleMouseLeave}
        >
          <FaUser size={20} />

          <motion.div
            className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#4F3267] to-[#8863FB] origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: hoveredItem === "user" ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>

        {hoveredItem === "user" && (
          <motion.div
            className="absolute z-[1000] top-full -left-48 w-max bg-white shadow-lg border border-gray-200 px-4 py-6 rounded-lg flex flex-col"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onMouseEnter={() => handleMouseEnter("user")}
            onMouseLeave={handleMouseLeave}
          >
            <div className="text-xl">
              {isLoggedIn
                ? `Hey ${customerDetails?.name ?? ""}`
                : `Your Account`}
            </div>
            <p className="text-sm text-[#4F3267]">
              Access account & manage your orders.
            </p>

            {isLoggedIn ? (
              <div className="flex flex-col gap-4 mt-4">
                <div className="cursor-pointer text-gray-700 inline-flex items-center gap-2 transition-all h-full duration-300 hover:text-[#8863FB]">
                  <IoIosListBox />
                  My Orders
                </div>
                <div
                  onClick={logoutHandler}
                  className="cursor-pointer text-gray-700 inline-flex items-center gap-2 transition-all h-full duration-300 hover:text-[#8863FB]"
                >
                  <SlLogout />
                  Logout
                </div>
              </div>
            ) : (
              <div className=" flex items-center gap-5 mt-10">
                <button
                  onClick={openLoginModal}
                  className="w-full bg-gradient-to-r from-[#4F3267] to-[#8863FB] text-white py-2 px-4 rounded-md shadow-sm hover:bg-[#8863FB] focus:outline-none focus:ring-2 focus:ring-[#4F3267]"
                >
                  Login
                </button>

                <button
                  onClick={openRegisterModal}
                  className="w-full bg-gradient-to-r from-[#4F3267] to-[#8863FB] text-white py-2 px-4 rounded-md shadow-sm hover:bg-[#8863FB] focus:outline-none focus:ring-2 focus:ring-[#4F3267]"
                >
                  Sign up
                </button>
              </div>
            )}
          </motion.div>
        )}

        <motion.div
          className="relative flex items-center transition-all h-full duration-300 hover:scale-105 hover:text-[#8863FB] hover:tracking-wide cursor-pointer px-2"
          whileHover={{ scale: 1.05 }}
          onMouseEnter={() => handleMouseEnter("wishlist")}
          onMouseLeave={handleMouseLeave}
        >
          <FaHeart size={20} />

          <motion.div
            className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#4F3267] to-[#8863FB] origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: hoveredItem === "wishlist" ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>

        <motion.div
          className="relative flex items-center transition-all h-full duration-300 hover:scale-105 hover:text-[#8863FB] hover:tracking-wide cursor-pointer px-2"
          whileHover={{ scale: 1.05 }}
          onMouseEnter={() => handleMouseEnter("cart")}
          onMouseLeave={handleMouseLeave}
        >
          <FaShoppingCart size={20} />

          <motion.div
            className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#4F3267] to-[#8863FB] origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: hoveredItem === "cart" ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
      </div>

      <div className="flex lg:hidden relative">
        <div
          onClick={() => setIsMenuOpen(true)}
          className="transition-all duration-300 hover:scale-105 hover:text-[#8863FB] cursor-pointer"
        >
          <GiHamburgerMenu size={20} />
        </div>

        {isMenuOpen ? (
          <motion.div
            className="absolute z-[1000] mt-2 top-full right-4 w-max bg-white shadow-lg border border-gray-200 px-4 py-6 rounded-lg flex flex-col"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-4 min-w-[170px]">
              <div className="max-w-[170px]">
                <div className="text-lg">
                  {isLoggedIn
                    ? `Hey ${customerDetails?.name ?? ""}`
                    : `Your Account`}
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
                  <div className="cursor-pointer text-gray-700 inline-flex items-center gap-2 transition-all h-full duration-300 hover:text-[#8863FB]">
                    <IoIosListBox />
                    My Orders
                  </div>
                  <div className="cursor-pointer text-gray-700 inline-flex items-center gap-2 transition-all h-full duration-300 hover:text-[#8863FB]">
                    <FaHeart />
                    My Wishlist
                  </div>
                  <div className="cursor-pointer text-gray-700 inline-flex items-center gap-2 transition-all h-full duration-300 hover:text-[#8863FB]">
                    <FaShoppingCart />
                    My Cart
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
        ) : null}
      </div>
    </header>
  );
};

export default Header;
