import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ContentDashboard from "../components/ContentDashboard";
import NavDashboard from "../components/NavDashboard";
import SidebarDashboard from "../components/SidebarDashboard";
import { initFlowbite } from "flowbite";
import { getUserRole } from "../api/auth/authService"; // Pastikan ini benar
import { useDarkMode } from "../context/DarkMode";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    // Cek role user langsung dari database Firestore
    const checkUser = async () => {
      const role = await getUserRole();
      if (role !== "admin") {
        navigate("/login"); // Redirect jika bukan admin
      }
      setIsLoading(false);
    };

    checkUser();
  }, [navigate]);

  useEffect(() => {
    if (!isLoading) {
      initFlowbite(); // Inisialisasi Flowbite setelah isLoading selesai
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div
        className={`${
          isDarkMode ? "bg-[#140C00]" : "bg-[#f4f6f9]"
        } flex justify-center items-center min-h-screen`}
      >
        <p className={`${isDarkMode ? "text-[#f0f0f0]" : "text-[#353535]"}`}>
          Memuat data...
        </p>
        {/* Tambahkan spinner atau skeleton loader di sini */}
      </div>
    );
  }

  return (
    <>
      <NavDashboard />
      <SidebarDashboard />
      <ContentDashboard />
      <SidebarDashboard />
    </>
  );
};

export default AdminDashboard;
