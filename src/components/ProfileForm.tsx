import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../config/Firebase";
import { doc, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { useUser } from "../context/UserContext";
import { useDarkMode } from "../context/DarkMode";

const ProfileForm = () => {
  const { isDarkMode } = useDarkMode();
  const { user } = useUser();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [alamat, setAlamat] = useState("");
  const [no_hp, setNoHp] = useState("");
  const [tanggal_lahir, setTanggalLahir] = useState("");
  const [jenis_kelamin, setJenisKelamin] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setAlamat(user.alamat || "");
      setNoHp(user.no_hp || "");
      setTanggalLahir(user.tanggal_lahir || "");
      setJenisKelamin(user.jenis_kelamin || "");
      setLoading(false);
    }
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!user) {
      setError("Anda harus login untuk mengedit profil.");
      setLoading(false);
      return;
    }

    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        name,
        alamat,
        no_hp,
        tanggal_lahir,
        jenis_kelamin,
      });

      Swal.fire({
        title: "Berhasil!",
        text: "Data berhasil diubah!",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        navigate("/profile");
      });
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Gagal menyimpan perubahan.");
    } finally {
      setLoading(false);
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
        <label
          className={`${
            isDarkMode ? "text-white" : "text-gray-800"
          } block mb-1`}
        >
          Nama
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={`w-full p-2 border rounded ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
          }`}
        />
      </div>

      <div>
        <label
          className={`${
            isDarkMode ? "text-white" : "text-gray-800"
          } block mb-1`}
        >
          Email
        </label>
        <input
          type="email"
          value={user?.email || ""}
          disabled
          className={`w-full p-2 border rounded ${
            isDarkMode
              ? "bg-gray-800 text-gray-400"
              : "bg-gray-100 text-gray-600"
          }`}
        />
      </div>

      <div>
        <label
          className={`${
            isDarkMode ? "text-white" : "text-gray-800"
          } block mb-1`}
        >
          Alamat
        </label>
        <textarea
          value={alamat}
          onChange={(e) => setAlamat(e.target.value)}
          required
          className={`w-full p-2 border rounded ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
          }`}
        />
      </div>

      <label
        className={`${isDarkMode ? "text-white" : "text-gray-800"} block mb-1`}
      >
        No Hp
      </label>
      <input
        type="text"
        value={no_hp}
        onChange={(e) => setNoHp(e.target.value)}
        required
        className={`w-full p-2 border rounded ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        }`}
      />

      <label
        className={`${isDarkMode ? "text-white" : "text-gray-800"} block mb-1`}
      >
        Tanggal Lahir
      </label>
      <input
        type="date"
        value={tanggal_lahir}
        onChange={(e) => setTanggalLahir(e.target.value)}
        required
        className={`w-full p-2 border rounded ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        }`}
      />

      <select
        value={jenis_kelamin}
        onChange={(e) => setJenisKelamin(e.target.value)}
        required
        className={`w-full p-2 border rounded ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        }`}
      >
        <option value="">Pilih Jenis Kelamin</option>
        <option value="L">Laki-laki</option>
        <option value="P">Perempuan</option>
      </select>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full p-2 text-white rounded bg-green-600 hover:bg-green-700 cursor-pointer"
      >
        {loading ? "Menyimpan..." : "Simpan Perubahan"}
      </button>
    </form>
  );
};

export default ProfileForm;
