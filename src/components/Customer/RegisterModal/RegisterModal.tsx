import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAppContext } from "../../../context/AppProvider";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import { Customer } from "../../../model/Customer.model";
import {
  checkEmailExistsAPI,
  checkPhoneExistsAPI,
  createCustomerAPI,
} from "../../../services/customer/CustomerAuth.service";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

const RegisterModal: React.FC = () => {
  const { closeRegisterModal, openLoginModal } = useAppContext();
  const [inputs, setInputs] = useState<Customer>({
    id: "",
    name: "",
    email: "",
    phone: NaN,
    password: "",
    address: [],
    orders: [],
    cart: [],
    wishlist: [],
  });

  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: name === "phone" ? value.replace(/\D/g, "") : value,
    });
  };

  const validateForm = (): boolean => {
    const { name, email, phone, password } = inputs;

    if (!name || !email || !phone || !password || !confirmPassword) {
      toast.error("All fields are required.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const emailExists = await checkEmailExistsAPI(inputs.email);
    if (emailExists) {
      toast.error("Email is already in use. Please choose another.");
      return;
    }

    const phoneExists = await checkPhoneExistsAPI(inputs.phone);
    if (phoneExists) {
      toast.error("Phone no. is already in use. Please choose another.");
      return;
    }

    try {
      const secretRounds = parseInt(
        process.env.REACT_APP_SECRET_KEY || "10",
        10
      );
      const hashedPassword = await bcrypt.hash(inputs.password, secretRounds);

      const formData = {
        ...inputs,
        password: hashedPassword,
        id: uuidv4(),
      };
      await createCustomerAPI(formData);
      toast.success("Registered successfully! Please log in to your account.");
      closeRegisterModal();
      openLoginModal();
    } catch (error) {
      console.error("Error during registration:", error);

      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="fixed z-[2000] inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg max-w-3xl w-full relative"
      >
        <IoMdClose
          className="absolute top-5 right-5 cursor-pointer hover:scale-105 transition-all ease-in-out duration-300"
          size={24}
          onClick={() => closeRegisterModal()}
        />

        <div className="flex bg-gradient-to-r rounded-lg from-[#4F3267] to-[#8863FB]">
          <div className="px-10 hidden place-items-center md:grid">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/038/941/148/small/3d-account-login-and-password-form-png.png"
              alt="Login"
              className="w-[200px] h-[200px] object-cover"
            />
          </div>

          <div className="flex-1 flex items-center justify-center bg-white p-6 shadow-lg rounded-r-lg">
            <div className="w-full max-w-md">
              <h2 className="text-3xl font-bold text-center text-[#4F3267] mb-8">
                Register
              </h2>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="flex items-center justify-between gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={inputs.name}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4F3267] focus:border-[#4F3267]"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone no.
                    </label>
                    <input
                      id="phone"
                      type="number"
                      name="phone"
                      value={inputs.phone}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4F3267] focus:border-[#4F3267]"
                      placeholder="Enter your phone no."
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={inputs.email}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4F3267] focus:border-[#4F3267]"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={inputs.password}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4F3267] focus:border-[#4F3267]"
                    placeholder="Enter your password"
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirm_password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="confirm_password"
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4F3267] focus:border-[#4F3267]"
                    placeholder="Confirm your password"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full bg-[#4F3267] text-white py-2 px-4 rounded-md shadow-sm hover:bg-[#8863FB] focus:outline-none focus:ring-2 focus:ring-[#4F3267]"
                  >
                    Register
                  </button>
                </div>
              </form>

              <div className="mt-4 text-center">
                <p className="text-sm text-[#4F3267]">
                  Create an account to explore products, add items to your
                  wishlist, and place your orders effortlessly.
                </p>

                <p className="mt-2 text-sm">
                  Already have an account?{" "}
                  <span
                    onClick={() => {
                      openLoginModal();
                      closeRegisterModal();
                    }}
                    className="text-[#8863FB] underline hover:text-[#4F3267] transition-all cursor-pointer"
                  >
                    Log in
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterModal;
