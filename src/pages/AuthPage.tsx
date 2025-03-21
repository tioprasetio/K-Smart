import React from "react";
import AuthForm from "../components/AuthForm";
import { Link } from "react-router";
import { useDarkMode } from "../context/DarkMode";
import NavbarComponent from "../components/Navbar";

const AuthPage: React.FC = () => {
  const { isDarkMode } = useDarkMode();
  return (
    <>
      <NavbarComponent />
      <div
        className={`${
          isDarkMode ? "bg-[#140c00]" : "bg-[#f4f6f9]"
        } flex h-full p-6 pt-28 sm:pt-32 items-center justify-center`}
      >
        <div
          className={`${
            isDarkMode ? "bg-[#303030]" : "bg-white"
          } w-full max-w-md p-8 shadow-md rounded-lg`}
        >
          <div className="text-2xl font-bold text-center mb-6 flex items-center justify-center">
            <Link to="/">
              <img
                src="https://k-net.co.id/assets/images/logo.png"
                className="h-8 inline-block"
                alt="K-Link"
              />
              <span
                className={`${
                  isDarkMode ? "text-[#f0f0f0]" : "text-[#353535]"
                } inline-block`}
              >
                Login K-Smart
              </span>
            </Link>
          </div>
          <AuthForm />
        </div>
      </div>
    </>
  );
};

export default AuthPage;
