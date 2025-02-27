import { useState } from "react";
import { useCart } from "../context/CartContext"; // Import useCart
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth/authService";
import { useDarkMode } from "../context/DarkMode";

const LoginForm = () => {
  const { isDarkMode } = useDarkMode();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUserEmail } = useCart(); // Ambil setUserEmail dari context

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await loginUser(email, password);

      // Simpan user ke localStorage
      localStorage.setItem("user", JSON.stringify(user));

      // Perbarui userEmail di CartProvider
      setUserEmail(user.email);

      setError("");
      navigate("/"); // Arahkan ke halaman utama
    } catch (err) {
      console.error("Login error:", err);
      setError("Email atau password salah.");
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className={`w-full p-2 border rounded ${
          isDarkMode ? "bg-[#252525] text-[#f0f0f0]" : "bg-white text-[#353535]"
        }`}
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className={`w-full p-2 border rounded ${
          isDarkMode ? "bg-[#252525] text-[#f0f0f0]" : "bg-white text-[#353535]"
        }`}
      />

      <button
        type="submit"
        className="w-full p-2 text-white rounded bg-[#28a154] hover:bg-[#167e3c] cursor-pointer"
      >
        Login
      </button>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </form>
  );
};

export default LoginForm;
