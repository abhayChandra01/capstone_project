import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import useAdminDetails from "../../../hooks/useAdminDetails";
import bcrypt from "bcryptjs";
import { updateVendorAPI } from "../../../services/admin/Vendor.service";

type Props = {
  onClose: () => void;
};

const ResetPasswordModal: React.FC<Props> = ({ onClose }) => {
  const adminDetails = useAdminDetails();
  const [inputs, setInputs] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();

    const { password, confirmPassword } = inputs;

    if (!password || !confirmPassword) {
      toast.error("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const newPassword = password || "";
    const secretRounds = parseInt(process.env.REACT_APP_SECRET_KEY || "10", 10);
    const hashedPassword = await bcrypt.hash(newPassword, secretRounds);

    const newVendorData = {
      id: adminDetails?.id || "",
      vendor_id: adminDetails?.vendor_id || "",
      name: adminDetails?.name || "",
      email: adminDetails?.email || "",
      role: "vendor" as const,
      password: hashedPassword || "",
      reset_password: true,
    };

    try {
      const user = await updateVendorAPI(adminDetails?.id || "", newVendorData);
      localStorage.setItem("admin_user", JSON.stringify(user));
      toast.success("Password updated successfully!");
      onClose();
    } catch {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="fixed z-[1000] inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg p-6 w-[450px]"
      >
        <h2 className="text-xl font-bold mb-4">Reset Password</h2>
        <p className="text-sm text-gray-700 mb-6">
          Welcome! For your security, please reset your password as this is your
          first login.
        </p>

        <form onSubmit={handleConfirm}>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={inputs.password}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4F3267] focus:border-[#4F3267]"
              placeholder="Enter a new password"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={inputs.confirmPassword}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4F3267] focus:border-[#4F3267]"
              placeholder="Confirm your new password"
            />
          </div>

          <div className="flex justify-end items-center gap-2">
            <button
              type="submit"
              className="bg-[#4F3267] text-sm text-white py-2 px-4 rounded-md shadow-sm hover:bg-[#8863FB] focus:outline-none focus:ring-2 focus:ring-[#4F3267]"
            >
              Confirm
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPasswordModal;
