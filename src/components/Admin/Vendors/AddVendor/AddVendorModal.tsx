import React, { useState } from "react";
import { createVendor } from "../../../../model/Vendor.model";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import {
  checkEmailExistsAPI,
  createVendorAPI,
} from "../../../../services/admin/Vendor.service";
import { motion } from "framer-motion";
import bcrypt from "bcryptjs";

type Props = {
  onClose: () => void;
};

const AddVendorModal: React.FC<Props> = ({ onClose }) => {
  const [formData, setFormData] = useState<createVendor>({
    id: "",
    vendor_id: "",
    name: "",
    email: "",
    role: "vendor",
    password: "",
    reset_password: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    return formData.name && formData.email && formData.password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    const emailExists = await checkEmailExistsAPI(formData.email);
    if (emailExists) {
      toast.error("Email is already in use. Please choose another.");
      return;
    }

    const password = formData?.password || "";
    const secretRounds = parseInt(process.env.REACT_APP_SECRET_KEY || "10", 10);
    const hashedPassword = await bcrypt.hash(password, secretRounds);

    const newVendorData = {
      ...formData,
      id: uuidv4(),
      vendor_id: uuidv4(),
      password: hashedPassword,
    };

    try {
      await createVendorAPI(newVendorData);
      toast.success("Vendor created successfully!");
      onClose();
    } catch {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg p-6 w-[450px]"
      >
        <h2 className="text-xl font-bold mb-4">Add Vendor</h2>
        <form onSubmit={handleSubmit}>
          <div className="w-full mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Vendor Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              autoFocus
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4F3267] focus:border-[#4F3267]"
              placeholder="Enter name"
            />
          </div>
          <div className="w-full mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Vendor Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4F3267] focus:border-[#4F3267]"
              placeholder="Enter email"
            />
          </div>
          <div className="w-full mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Vendor Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4F3267] focus:border-[#4F3267]"
              placeholder="Enter password"
            />
          </div>

          <div className="flex justify-end items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-sm text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-fit bg-[#4F3267] text-sm text-white py-2 px-4 rounded-md shadow-sm hover:bg-[#8863FB] focus:outline-none focus:ring-2 focus:ring-[#4F3267]"
            >
              Create
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddVendorModal;
