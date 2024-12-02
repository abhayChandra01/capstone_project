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
import HeaderMenu from "../HeaderMenu/HeaderMenu";
import logo from "../../../assets/logo/Logo.png";

const Header: React.FC = () => {
  const { openLoginModal, openRegisterModal, isLoggedIn, logoutHandler } =
    useAppContext();
  const navigate = useNavigate();
  const customerDetails = useCustomerDetails();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const wishListCount = customerDetails?.wishlist?.length || 0;

  const cart = customerDetails?.cart || [];
  const cartCount =
    cart?.reduce(
      (total: number, item: { product_count?: number }) =>
        total + (item.product_count || 0),
      0
    ) || 0;

  const handleMouseEnter = (item: string) => setHoveredItem(item);
  const handleMouseLeave = () => setHoveredItem(null);

  return (
    <header className="h-[100px] w-screen bg-white text-black flex gap-10 items-center justify-between px-10 border-b border-gray-300">
      <div className="flex items-center gap-10 h-full w-full">
        <img
          src={logo}
          onClick={() => navigate("/")}
          className="w-20 cursor-pointer"
        />

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
                <div
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer text-gray-700 inline-flex items-center gap-2 transition-all h-full duration-300 hover:text-[#8863FB]"
                >
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
          onClick={() => navigate("/wishlist")}
          className="relative flex items-center transition-all h-full duration-300 hover:scale-105 hover:text-[#8863FB] hover:tracking-wide cursor-pointer px-2"
          whileHover={{ scale: 1.05 }}
          onMouseEnter={() => handleMouseEnter("wishlist")}
          onMouseLeave={handleMouseLeave}
        >
          <div className="relative">
            <FaHeart size={20} />

            {wishListCount ? (
              <div className="absolute -bottom-1.5 -right-1.5 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {wishListCount}
              </div>
            ) : null}
          </div>

          <motion.div
            className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#4F3267] to-[#8863FB] origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: hoveredItem === "wishlist" ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>

        <motion.div
          onClick={() => navigate("/cart")}
          className="relative flex items-center transition-all h-full duration-300 hover:scale-105 hover:text-[#8863FB] hover:tracking-wide cursor-pointer px-2"
          whileHover={{ scale: 1.05 }}
          onMouseEnter={() => handleMouseEnter("cart")}
          onMouseLeave={handleMouseLeave}
        >
          <div className="relative">
            <FaShoppingCart size={20} />
            {cartCount ? (
              <div className="absolute -bottom-1.5 -right-1.5 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {cartCount}
              </div>
            ) : null}
          </div>

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

        <HeaderMenu
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          wishListCount={wishListCount}
          cartCount={cartCount}
        />
      </div>
    </header>
  );
};

export default Header;
