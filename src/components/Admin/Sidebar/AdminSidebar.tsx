import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { navConfig } from "../../../utils/config/navConfig";
import { useAdminContext } from "../../../context/AdminProvider";
import useAdminDetails from "../../../hooks/useAdminDetails";

const Sidebar: React.FC = () => {
  const { logoutHandler } = useAdminContext();
  const adminDetails = useAdminDetails();
  const navItems = adminDetails ? navConfig[adminDetails?.role] : [];

  return (
    <div className="w-64 bg-[#4F3267] text-white h-screen py-4 px-2">
      <div className="text-lg font-semibold h-16 px-2">Menu</div>
      <ul className="">
        {navItems.map((item) => (
          <Link to={item.path}>
            <li
              key={item.path}
              className="hover:bg-[#8863FB] hover:bg-opacity-10 hover:text-gray-300 cursor-pointer p-2 rounded-lg"
            >
              {item.label}
            </li>
          </Link>
        ))}

        <li
          onClick={() => {
            toast.success("Logged out successfully!");
            logoutHandler();
          }}
          className="hover:bg-[#8863FB] hover:bg-opacity-10 hover:text-gray-300 cursor-pointer p-2 rounded-lg"
        >
          <div>Logout</div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
