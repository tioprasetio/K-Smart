import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../config/Firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth } from "../config/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDarkMode } from "../context/DarkMode";
import Swal from "sweetalert2";

const ProfileForm = () => {
  const { isDarkMode } = useDarkMode();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [alamat, setAlamat] = useState("");
  const [no_hp, setNoHp] = useState("");
  const [tanggal_lahir, setTanggalLahir] = useState("");
  const [jenis_kelamin, setJenisKelamin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Ambil data pengguna yang sedang login
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setName(userSnap.data().name || "");
          setEmail(userSnap.data().email || "");
          setAlamat(userSnap.data().alamat || "");
          setNoHp(userSnap.data().no_hp || "");
          setTanggalLahir(userSnap.data().tanggal_lahir || "");
          setJenisKelamin(userSnap.data().jenis_kelamin || "");
        }
        setLoading(false); // Data selesai diambil
      } else {
        navigate("/login"); // Arahkan ke halaman login jika belum login
      }
    });

    return () => unsubscribe(); // Bersihkan listener saat komponen di-unmount
  }, [navigate]);

  // Fungsi untuk menyimpan perubahan
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      setError("Anda harus login untuk mengedit profil.");
      return;
    }

    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        name: name,
        alamat: alamat,
        no_hp: no_hp,
        tanggal_lahir: tanggal_lahir,
        jenis_kelamin: jenis_kelamin,
      });

      Swal.fire({
        title: "Berhasil!",
        text: "Data berhasil diubah!",
        icon: "success",
        showConfirmButton: false, // Supaya langsung otomatis hilang
        timer: 1500, // Hilang dalam 1,5 detik
      }).then(() => {
        navigate("/profile"); // Pindah ke halaman profile setelah alert selesai
      });
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Gagal menyimpan perubahan.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <p className={`${isDarkMode ? "text-white" : "text-[#353535]"}`}>
          Memuat data...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-4">
      <div>
        <label className={`${isDarkMode ? "text-white" : "text-["} block mb-1`}>
          Nama
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={`w-full p-2 border rounded ${
            isDarkMode ? "bg-[#252525] text-white" : "bg-white text-["
          }`}
        />
      </div>

      <div>
        <label
          className={`${
            isDarkMode ? "text-white" : "text-[#353535]"
          } block mb-1`}
        >
          Email
        </label>
        <input
          type="email"
          value={email}
          disabled
          className={`w-full p-2 border rounded ${
            isDarkMode
              ? "bg-[#252525] text-gray-400"
              : "bg-gray-100 text-gray-600"
          }`}
        />
      </div>

      <div>
        <label className={`${isDarkMode ? "text-white" : "text-["} block mb-1`}>
          Alamat
        </label>
        <textarea
          value={alamat}
          onChange={(e) => setAlamat(e.target.value)}
          required
          className={`w-full p-2 border rounded ${
            isDarkMode ? "bg-[#252525] text-white" : "bg-white text-["
          }`}
        />
      </div>

      <label className={`${isDarkMode ? "text-white" : "text-["} block mb-1`}>
        No Hp
      </label>
      <input
        type="text"
        value={no_hp}
        onChange={(e) => setNoHp(e.target.value)}
        required
        className={`w-full p-2 border rounded ${
          isDarkMode ? "bg-[#252525] text-white" : "bg-white text-["
        }`}
      />

      <label className={`${isDarkMode ? "text-white" : "text-["} block mb-1`}>
        Tanggal Lahir
      </label>
      <input
        type="date"
        id="tanggal_lahir"
        value={tanggal_lahir}
        onChange={(e) => setTanggalLahir(e.target.value)}
        required
        className={`w-full p-2 border rounded ${
          isDarkMode ? "bg-[#252525] text-[#f0f0f0]" : "bg-white text-[#353535]"
        }`}
      />
      <select
        value={jenis_kelamin}
        onChange={(e) => setJenisKelamin(e.target.value)}
        required
        className={`w-full p-2 border rounded ${
          isDarkMode ? "bg-[#252525] text-[#f0f0f0]" : "bg-white text-[#353535]"
        }`}
      >
        <option value="">Pilih Jenis Kelamin</option>
        <option value="L">Laki-laki</option>
        <option value="P">Perempuan</option>
      </select>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="w-full p-2 text-white rounded bg-[#28a154] hover:bg-[#167e3c] cursor-pointer"
      >
        Simpan Perubahan
      </button>
    </form>
  );
};

export default ProfileForm;
