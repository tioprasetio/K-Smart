import { useState } from "react";
import { useCart } from "../context/CartContext"; // Import useCart
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth/authService";
import { useDarkMode } from "../context/DarkMode";
import { db } from "../config/Firebase"; // Import Firestore
import { doc, getDoc, setDoc } from "firebase/firestore"; // Import Firestore functions

const LoginForm = () => {
  const { isDarkMode } = useDarkMode();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUserEmail } = useCart(); // Ambil setUserEmail dari context

  // 🔥 Fungsi untuk menyimpan user ke Firestore jika belum ada
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const saveUserToFirestore = async (user: any) => {
    try {
      const userRef = doc(db, "users", user.uid); // Dokumen berdasarkan UID
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // Jika user belum ada, tambahkan ke Firestore
        await setDoc(userRef, {
          name: user.displayName || "User", // Nama default jika tidak ada
          email: user.email,
          BV: 0, // BV default 0
        });
        console.log("User baru disimpan ke Firestore");
      }
    } catch (error) {
      console.error("Error menyimpan user ke Firestore:", error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await loginUser(email, password); // Login ke Firebase

      if (user) {
        await saveUserToFirestore(user); // 🔥 Simpan ke Firestore jika belum ada

        // Simpan ke localStorage & pindah ke halaman utama
        localStorage.setItem("user", JSON.stringify(user));
        setUserEmail(user.email);
        navigate("/");
      }
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
