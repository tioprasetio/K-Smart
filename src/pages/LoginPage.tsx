import React from "react";
import LoginForm from "../components/LoginForm";
import { Link } from "react-router";

const LoginPage: React.FC = () => {
  return (
    <div className="flex min-h-screen p-6 items-center justify-center bg-[#f4f6f9]">
      <div className="w-full max-w-md bg-white p-8 shadow-md rounded-lg">
        <div className="text-2xl font-bold text-center mb-6 flex items-center justify-center">
          <Link to="/">
            <img
              src="https://k-net.co.id/assets/images/logo.png"
              className="h-8 inline-block"
              alt="K-Link"
            />
            <span className="inline-block">Login K-Smart</span>
          </Link>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
