import { useState } from "react";
import { useCart } from "../context/CartContext"; // Import useCart
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../api/auth/authService"; // Import registerUser
import { useDarkMode } from "../context/DarkMode";
import { db } from "../config/Firebase"; // Import Firestore
import { doc, getDoc, setDoc } from "firebase/firestore"; // Import Firestore functions

const AuthForm = () => {
  const { isDarkMode } = useDarkMode();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // State untuk nama
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false); // State untuk mode registrasi
  const navigate = useNavigate();
  const { setUserEmail } = useCart(); // Ambil setUserEmail dari context

  // 🔥 Fungsi untuk menyimpan user ke Firestore jika belum ada
  const saveUserToFirestore = async (user: {
    uid: string;
    email: string | null;
  }) => {
    try {
      const userRef = doc(db, "users", user.uid); // Dokumen berdasarkan UID
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // Jika user belum ada, tambahkan ke Firestore
        await setDoc(userRef, {
          name: name || "User", // Gunakan nama dari input atau default "User"
          email: user.email,
          BV: 0, // BV default 0
        });
      }
    } catch (error) {
      console.error("Error menyimpan user ke Firestore:", error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await loginUser(email, password); // Langsung dapatkan user

      if (user && user.email) {
        // Pastikan user dan user.email ada

        // Simpan ke localStorage & pindah ke halaman utama
        localStorage.setItem("user", JSON.stringify(user));
        setUserEmail(user.email); // Set email ke context
        navigate("/");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Email atau password salah.");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { user } = await registerUser(email, password); // Destructure user dari AuthResponse

      if (user && user.email) {
        // Pastikan user dan user.email ada
        await saveUserToFirestore(user); // Simpan ke Firestore

        // Simpan ke localStorage & pindah ke halaman utama
        localStorage.setItem("user", JSON.stringify(user));
        setUserEmail(user.email); // Set email ke context
        navigate("/");
      }
    } catch (err) {
      console.error("Register error:", err);
      setError("Registrasi gagal. Coba lagi.");
    }
  };

  return (
    <form
      onSubmit={isRegistering ? handleRegister : handleLogin}
      className="space-y-4"
    >
      {isRegistering && (
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama"
          required
          className={`w-full p-2 border rounded ${
            isDarkMode
              ? "bg-[#252525] text-[#f0f0f0]"
              : "bg-white text-[#353535]"
          }`}
        />
      )}

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
        {isRegistering ? "Register" : "Login"}
      </button>

      <div className="flex justify-center items-center gap-1">
        <p className={`${isDarkMode ? "text-[#f0f0f0]" : "text-[#353535]"}`}>
          {isRegistering ? "Sudah punya akun?" : "Belum punya akun?"}
        </p>

        <button
          type="button"
          onClick={() => setIsRegistering(!isRegistering)}
          className={`${
            isDarkMode ? "text-[#28a154]" : "text-[#28a154]"
          } hover:underline cursor-pointer inline-flex`}
        >
          {isRegistering ? "Login" : "Register"}
        </button>
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </form>
  );
};

export default AuthForm;
