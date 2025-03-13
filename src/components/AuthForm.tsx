import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../api/auth/authService"; // Import registerUser
import { useDarkMode } from "../context/DarkMode";
import { db } from "../config/Firebase"; // Import Firestore
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore"; // Import Firestore functions
import { useUser } from "../context/UserContext";

const AuthForm = () => {
  const { isDarkMode } = useDarkMode();
  const [email, setEmail] = useState("");
  const [referral_code, setReferralCode] = useState("");
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
  // const { setUserEmail } = useCart();
  const { setUser } = useUser();

  // 🔥 Fungsi untuk memvalidasi referral code (UID leader)
  const validateReferralCode = async (referralCode: string) => {
    try {
      const leaderRef = doc(db, "users", referralCode); // Cari user dengan UID
      const leaderSnap = await getDoc(leaderRef);

      if (!leaderSnap.exists()) {
        throw new Error(
          "Referral code tidak valid. Pastikan referral code benar."
        );
      }
      return referralCode; // Kembalikan UID leader
    } catch (error) {
      console.error("Error validasi referral code:", error);
      throw error;
    }
  };

  // 🔥 Fungsi untuk memeriksa apakah email sudah digunakan
  const checkEmailExists = async (email: string) => {
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        throw new Error("Email sudah digunakan.");
      }
    } catch (error) {
      console.error("Error memeriksa email:", error);
      throw error;
    }
  };

  // 🔥 Fungsi untuk menyimpan user ke Firestore jika belum ada
  const saveUserToFirestore = async (user: {
    uid: string;
    email: string | null;
    name: string;
    alamat: string;
    no_hp: string;
    tanggal_lahir: string;
    jenis_kelamin: string;
    referral_code: string;
  }) => {
    try {
      const userRef = doc(db, "users", user.uid); // Dokumen berdasarkan UID
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // Jika user belum ada, tambahkan ke Firestore
        const userData = {
          name: name || "User", // Gunakan nama dari input atau default "User"
          email: user.email,
          BV: 0, // BV default 0
          alamat: user.alamat,
          no_hp: user.no_hp,
          tanggal_lahir: user.tanggal_lahir,
          jenis_kelamin: user.jenis_kelamin,
          leader_id: null as string | null, // Default null, akan diupdate jika referral code valid
        };

        // Jika referral code (UID leader) valid, simpan leader_id
        if (user.referral_code) {
          const leaderId = await validateReferralCode(user.referral_code);
          userData.leader_id = leaderId; // Update leader_id jika referral code valid
        }

        await setDoc(userRef, userData); // Simpan data user ke Firestore
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
        const userData = {
          ...user,
          role: "user", // Pastikan ada role, default ke "user"
        };
        // Pastikan user dan user.email ada
        setUser(userData); // Set email ke context
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
      // Validasi email sebelum melanjutkan registrasi
      await checkEmailExists(email);

      // Validasi referral code sebelum melanjutkan registrasi
      if (referral_code) {
        await validateReferralCode(referral_code); // Jika referral code tidak valid, ini akan melempar error
      }

      const { user } = await registerUser(email, password);
      if (user && user.email) {
        await saveUserToFirestore({
          ...user,
          name,
          alamat,
          no_hp,
          tanggal_lahir,
          jenis_kelamin,
          referral_code,
        });

        // Simpan ke localStorage & pindah ke halaman utama
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user); // Set email ke context
        navigate("/");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Register error:", err);
      setError(err.message || "Registrasi gagal. Coba lagi."); // Tampilkan pesan error yang spesifik
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

      {isRegistering && (
        <input
          type="text"
          value={referral_code}
          onChange={(e) => setReferralCode(e.target.value)}
          placeholder="Code Referral"
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
