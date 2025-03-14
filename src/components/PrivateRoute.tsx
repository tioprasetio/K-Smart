import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext"; // Pastikan path ini sesuai
import { useDarkMode } from "../context/DarkMode";

const PrivateRoute = () => {
  const { user, isAuthChecked } = useUser(); // Ambil `isAuthChecked`
  const { isDarkMode } = useDarkMode();

  if (!isAuthChecked) {
    return (
      <div className="flex justify-center items-center text-center h-screen">
        <p className={`${isDarkMode ? "text-white" : "text-[#353535]"}`}>
          Memuat data...
        </p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
