import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import useCustomerDetails from "../../../hooks/useCustomerDetails";
import { v4 as uuidv4 } from "uuid";
import { updateAddressAPI } from "../../../services/customer/Products.service";
import { useAppContext } from "../../../context/AppProvider";

type Props = {
  onClose: () => void;
};

const AddAddressModal: React.FC<Props> = ({ onClose }) => {
  const customerDetails = useCustomerDetails();
  const { setRefreshDetails } = useAppContext();
  const [inputs, setInputs] = useState<{
    id: string;
    address_id: string;
    address_line: string;
    city: string;
    state: string;
    pincode: number;
  }>({
    id: "",
    address_id: "",
    address_line: "",
    city: "",
    state: "",
    pincode: NaN,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!inputs.address_line.trim()) {
      toast.error("Address line is required.");
      return false;
    }
    if (!inputs.state.trim()) {
      toast.error("State is required.");
      return false;
    }
    if (!inputs.city.trim()) {
      toast.error("City is required.");
      return false;
    }
    if (!/^\d{6}$/.test(inputs.pincode.toString())) {
      toast.error("Pin Code must be a 6-digit number.");
      return false;
    }
    return true;
  };

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newAddress = {
      ...inputs,
      id: uuidv4(),
      address_id: uuidv4(),
    };

    const oldAddresses = [...(customerDetails?.address || [])];

    const updatedAddresses = [...oldAddresses, newAddress];
    try {
      const user = await updateAddressAPI(
        customerDetails?.id || "",
        updatedAddresses
      );
      localStorage.setItem("customer_user", JSON.stringify(user));
      toast.success("Address added successfully!");
      onClose();
      setRefreshDetails(true);
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
        className="bg-white rounded-lg p-6 w-[550px]"
      >
        <h2 className="text-xl font-bold mb-4">Add a address</h2>

        <form onSubmit={handleConfirm}>
          <div className="mb-4">
            <label
              htmlFor="address_line"
              className="block text-sm font-medium text-gray-700"
            >
              Address Line
            </label>
            <input
              id="address_line"
              type="text"
              name="address_line"
              value={inputs.address_line}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4F3267] focus:border-[#4F3267]"
              placeholder="Enter address"
            />
          </div>

          <div className="flex justify-between gap-4 mb-4">
            <div className="w-full">
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700"
              >
                State
              </label>
              <input
                id="state"
                type="text"
                name="state"
                value={inputs.state}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4F3267] focus:border-[#4F3267]"
                placeholder="Enter state"
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                City
              </label>
              <input
                id="city"
                type="text"
                name="city"
                value={inputs.city}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4F3267] focus:border-[#4F3267]"
                placeholder="Enter city"
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="pincode"
              className="block text-sm font-medium text-gray-700"
            >
              Pin Code
            </label>
            <input
              id="pincode"
              type="number"
              name="pincode"
              value={inputs.pincode}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4F3267] focus:border-[#4F3267]"
              placeholder="Enter pincode"
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
              //   onClick={onConfirm}
              className="bg-[#4F3267] text-sm text-white py-2 px-4 rounded-md shadow-sm hover:bg-[#8863FB] focus:outline-none focus:ring-2 focus:ring-[#4F3267]"
            >
              Save
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddAddressModal;
