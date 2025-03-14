import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import NavDashboard from "../components/NavDashboard";
import SidebarDashboard from "../components/SidebarDashboard";
import { initFlowbite } from "flowbite";
import { getUserRole } from "../api/auth/authService";
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
      </div>
    );
  }

  return (
    <>
      <NavDashboard />
      <SidebarDashboard />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
