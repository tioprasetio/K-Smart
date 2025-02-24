import React, { useState } from "react";
import { useNavigate } from "react-router";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

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
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="w-full p-2 bg-[#28a154] hover:bg-[#167e3c] cursor-pointer text-white rounded"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
