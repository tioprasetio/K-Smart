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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [alamat, setAlamat] = useState("");
  const [no_hp, setNoHp] = useState("");
  const [tanggal_lahir, setTanggalLahir] = useState("");
  const [jenis_kelamin, setJenisKelamin] = useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();
  const { setUserEmail } = useCart();

  // 🔥 Fungsi untuk menyimpan user ke Firestore jika belum ada
  const saveUserToFirestore = async (user: {
    uid: string;
    email: string | null;
    name: string;
    alamat: string;
    no_hp: string;
    tanggal_lahir: string;
    jenis_kelamin: string;
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
          alamat: user.alamat,
          no_hp: user.no_hp,
          tanggal_lahir: user.tanggal_lahir,
          jenis_kelamin: user.jenis_kelamin,
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

    if (!/^\d+$/.test(no_hp)) {
      setError("Nomor HP harus berisi angka saja.");
      return;
    }

    // Validasi password dan confirm password
    if (password !== confirmPassword) {
      setError("Password dan Confirm Password harus sama.");
      return; // Hentikan proses registrasi jika tidak sama
    }

    try {
      const { user } = await registerUser(email, password);
      if (user && user.email) {
        await saveUserToFirestore({
          ...user,
          name,
          alamat,
          no_hp,
          tanggal_lahir,
          jenis_kelamin,
        });

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
        <>
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
          <textarea
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
            placeholder="Alamat"
            required
            className={`w-full p-2 border rounded ${
              isDarkMode
                ? "bg-[#252525] text-[#f0f0f0]"
                : "bg-white text-[#353535]"
            }`}
          />
          <input
            type="tel"
            value={no_hp}
            onChange={(e) => setNoHp(e.target.value)}
            placeholder="Nomor HP"
            required
            className={`w-full p-2 border rounded ${
              isDarkMode
                ? "bg-[#252525] text-[#f0f0f0]"
                : "bg-white text-[#353535]"
            }`}
          />

          <div>
            <label
              htmlFor="tanggal_lahir"
              className={`text-sm ${
                isDarkMode ? "text-[#f0f0f0]" : "text-[#353535]"
              }`}
            >
              Tanggal Lahir
            </label>
            <input
              type="date"
              id="tanggal_lahir"
              value={tanggal_lahir}
              onChange={(e) => setTanggalLahir(e.target.value)}
              required
              className={`w-full p-2 border rounded ${
                isDarkMode
                  ? "bg-[#252525] text-[#f0f0f0]"
                  : "bg-white text-[#353535]"
              }`}
            />
          </div>
          <select
            value={jenis_kelamin}
            onChange={(e) => setJenisKelamin(e.target.value)}
            required
            className={`w-full p-2 border rounded ${
              isDarkMode
                ? "bg-[#252525] text-[#f0f0f0]"
                : "bg-white text-[#353535]"
            }`}
          >
            <option value="">Pilih Jenis Kelamin</option>
            <option value="L">Laki-laki</option>
            <option value="P">Perempuan</option>
          </select>
        </>
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

      {isRegistering && (
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
          className={`w-full p-2 border rounded ${
            isDarkMode
              ? "bg-[#252525] text-[#f0f0f0]"
              : "bg-white text-[#353535]"
          }`}
        />
      )}

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
