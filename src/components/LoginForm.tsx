import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDarkMode } from "../context/DarkMode";

const LoginForm: React.FC = () => {
  const { isDarkMode } = useDarkMode();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    setErrors((prevErrors) => ({
      ...prevErrors,
      email: validateEmail(value) ? "" : "Format email tidak valid.",
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    setErrors((prevErrors) => ({
      ...prevErrors,
      password: validatePassword(value)
        ? ""
        : "Password harus minimal 6 karakter.",
    }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();


   if (!validateEmail(email) || !validatePassword(password)) {
     setErrors({
       email: validateEmail(email) ? "" : "Format email tidak valid.",
       password: validatePassword(password)
         ? ""
         : "Password harus minimal 6 karakter.",
     });
     return;
   }

    setErrors({});

    // Simpan user ke localStorage (dummy authentication)
    const userData = { email, password };
    localStorage.setItem("user", JSON.stringify(userData));

    // Kirim email ke Google Analytics
    if (window.gtag) {
      window.gtag("set", { user_id: email }); // Gunakan email sebagai user ID
      window.gtag("config", "G-5B1S66Q62L", { user_id: email });
    }

    navigate("/");
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={handleEmailChange}
          className={`${
            isDarkMode
              ? "bg-[#252525] text-[#f0f0f0]"
              : "bg-white text-[#353535]"
          } w-full p-2 border rounded`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={handlePasswordChange}
          className={`${
            isDarkMode
              ? "bg-[#252525] text-[#f0f0f0]"
              : "bg-white text-[#353535]"
          } w-full p-2 border rounded`}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={!email || !password || !!errors.email || !!errors.password}
        className={`w-full p-2 rounded text-white ${
          !email || !password || !!errors.email || !!errors.password
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#28a154] hover:bg-[#167e3c] cursor-pointer"
        }`}
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
