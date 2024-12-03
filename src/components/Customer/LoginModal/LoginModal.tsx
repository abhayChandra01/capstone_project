import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAppContext } from "../../../context/AppProvider";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import { customerLoginAPI } from "../../../services/customer/CustomerAuth.service";
import bcrypt from "bcryptjs";

const LoginModal: React.FC = () => {
  const { closeLoginModal, openRegisterModal, setIsLoggedIn } = useAppContext();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { email, password } = inputs;

    if (!email || !password) {
      toast.error("Both fields are required.");
      return;
    }

    try {
      const user = await customerLoginAPI(inputs.email);
      if (!user) {
        toast.error("User not found.");
        return;
      }

      const isPasswordValid = await bcrypt.compare(
        inputs.password,
        user.password
      );
      if (isPasswordValid) {
        toast.success("Logged in successfully!");
        localStorage.setItem("customer_user", JSON.stringify(user));
        setIsLoggedIn(true);
        closeLoginModal();
      } else {
        toast.error("Invalid email or password.");
      }
    } catch {
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
          onClick={() => closeLoginModal()}
        />

        <div className="flex bg-gradient-to-r rounded-lg from-[#4F3267] to-[#8863FB]">
          <div className="flex-1 hidden place-items-center md:grid">
            <img
              src="https://static.vecteezy.com/system/resources/previews/019/872/884/non_2x/3d-minimal-user-login-page-user-authentication-concept-user-verification-concept-login-page-with-a-fingerprint-padlock-3d-illustration-free-png.png"
              alt="Login"
              className="w-[200px] h-[200px] object-cover"
            />
          </div>

          <div className="flex-1 flex items-center justify-center bg-white p-6 shadow-lg rounded-r-lg">
            <div className="w-full max-w-md">
              <h2 className="text-3xl font-bold text-center text-[#4F3267] mb-8">
                Login
              </h2>

              <form className="space-y-4" onSubmit={handleSubmit}>
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
                  <button
                    type="submit"
                    className="w-full bg-[#4F3267] text-white py-2 px-4 rounded-md shadow-sm hover:bg-[#8863FB] focus:outline-none focus:ring-2 focus:ring-[#4F3267]"
                  >
                    Login
                  </button>
                </div>
              </form>

              <div className="mt-4 text-center">
                <p className="text-sm text-[#4F3267]">
                  Log in to explore your account, track your orders, and manage
                  your preferences with ease.
                </p>

                <p className="mt-2 text-sm">
                  Don’t have an account?{" "}
                  <span
                    onClick={() => {
                      closeLoginModal();
                      openRegisterModal();
                    }}
                    className="text-[#8863FB] underline hover:text-[#4F3267] transition-all cursor-pointer"
                  >
                    Sign Up
                  </span>
                </p>

                <div className="flex justify-center mt-4">
                  <button
                    type="button"
                    className="bg-transparent text-[#8863FB] border border-[#8863FB] py-2 px-4 rounded-md text-sm hover:bg-[#8863FB] hover:text-white transition-all"
                    onClick={() => window.open("/admin-login", "_blank")}
                  >
                    Login as Admin/Vendor
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginModal;
