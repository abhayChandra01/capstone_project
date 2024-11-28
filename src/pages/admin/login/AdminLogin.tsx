import React from "react";
import LoginForm from "../../../components/Admin/Login/LoginForm";
import { Toaster } from "react-hot-toast";

export default function AdminLogin() {
  return (
    <div className="flex h-screen bg-gradient-to-r from-[#4F3267] to-[#8863FB]">
      <Toaster position="bottom-center" />

      <div className="flex-1 hidden place-items-center md:grid">
        <img
          src="https://static.vecteezy.com/system/resources/previews/019/872/884/non_2x/3d-minimal-user-login-page-user-authentication-concept-user-verification-concept-login-page-with-a-fingerprint-padlock-3d-illustration-free-png.png"
          alt="Login"
          className="w-[200px] h-[200px] object-cover"
        />
      </div>

      <LoginForm />
    </div>
  );
}
