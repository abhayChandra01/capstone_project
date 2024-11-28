import React, { useState } from "react";
import toast from "react-hot-toast";
import { adminLoginAPI } from "../../../services/admin/AdminAuth.service";
import { useNavigate } from "react-router-dom";
import { navConfig } from "../../../utils/config/navConfig";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
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
      const user = await adminLoginAPI(email, password);
      if (user) {
        console.log(user);
        localStorage.setItem("admin_user", JSON.stringify(user));
        toast.success("Logged in successfully!");
        const firstRoute = navConfig[user.role][0]?.path || "/admin-login";
        navigate(firstRoute);
      } else {
        toast.error("Invalid email or password.");
      }
    } catch {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-white p-6 shadow-lg">
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
            Log in to access your admin dashboard and manage all your products
            and settings securely.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
