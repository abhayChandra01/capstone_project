import React from "react";
import { useAppContext } from "../../../context/AppProvider";

export default function NoLogin() {
  const { openLoginModal, openRegisterModal } = useAppContext();

  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/019/872/884/small/3d-minimal-user-login-page-user-authentication-concept-user-verification-concept-login-page-with-a-fingerprint-padlock-3d-illustration-free-png.png"
        alt="NoLogin"
        className="w-48"
      />
      <p className="text-lg text-gray-700">
        You are not logged in. Please log in to access this page.
      </p>
      <div className="mt-2 flex items-center gap-2">
        <button
          onClick={openLoginModal}
          className="w-fit bg-gradient-to-r from-[#4F3267] to-[#8863FB] text-white py-2 px-4 rounded-md shadow-sm hover:bg-[#8863FB] focus:outline-none focus:ring-2 focus:ring-[#4F3267]"
        >
          Log in
        </button>
        <button
          onClick={openRegisterModal}
          className="w-fit bg-gradient-to-r from-[#4F3267] to-[#8863FB] text-white py-2 px-4 rounded-md shadow-sm hover:bg-[#8863FB] focus:outline-none focus:ring-2 focus:ring-[#4F3267]"
        >
          Sign up
        </button>
      </div>
    </div>
  );
}
