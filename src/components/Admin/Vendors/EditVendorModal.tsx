import React, { useState } from "react";
import { createVendor } from "../../../model/Vendor.model";
import toast from "react-hot-toast";
import { updateVendorAPI } from "../../../services/admin/Vendor.service";
import { motion } from "framer-motion";

type Props = {
  onClose: () => void;
  vendor: createVendor | null;
};

const EditVendorModal: React.FC<Props> = ({ onClose, vendor }) => {
  const [formData, setFormData] = useState<createVendor>({
    id: vendor?.id || "",
    vendor_id: vendor?.vendor_id || "",
    name: vendor?.name || "",
    email: vendor?.email || "",
    role: "vendor",
    password: vendor?.password || "",
    reset_password: vendor?.reset_password || false,
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

    const newVendorData = {
      ...formData,
    };

    try {
      await updateVendorAPI(formData?.id, newVendorData);
      toast.success("Vendor updated successfully!");
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
        <h2 className="text-xl font-bold mb-4">Update Vendor</h2>
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
              autoFocus
              value={formData.name}
              onChange={handleChange}
              required
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
              readOnly
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4F3267] focus:border-[#4F3267] read-only:opacity-60"
              placeholder="Enter email"
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
              Update
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EditVendorModal;
