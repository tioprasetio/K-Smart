import React from "react";
import LoginForm from "../components/LoginForm";
import { Link } from "react-router";
import { useDarkMode } from "../context/DarkMode";
import NavbarComponent from "../components/Navbar";

const LoginPage: React.FC = () => {
  const { isDarkMode } = useDarkMode();
  return (
    <>
    <NavbarComponent />
    <div
      className={`${
        isDarkMode ? "bg-[#140c00]" : "bg-[#f4f6f9]"
      } flex min-h-screen p-6 items-center justify-center`}
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
            <span className={`${isDarkMode ? "text-[#f0f0f0]" : "text-[#353535]"} inline-block`}>Login K-Smart</span>
          </Link>
        </div>
        <LoginForm />
      </div>
    </div>
    </>
  );
};

export default LoginPage;
