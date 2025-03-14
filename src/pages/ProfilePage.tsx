import { Link, useNavigate } from "react-router-dom";
import NavbarComponent from "../components/Navbar";
import { useDarkMode } from "../context/DarkMode";
import { useUser } from "../context/UserContext";

const ProfilePage = () => {
  const { isDarkMode } = useDarkMode();
  const { user, isAuthChecked } = useUser();
  const navigate = useNavigate();

  // Jika autentikasi sudah dicek dan user tidak login, langsung redirect
  if (isAuthChecked && !user) {
    navigate("/login");
    return null;
  }

  // Tampilkan loading hanya jika autentikasi belum dicek
  if (!isAuthChecked) {
    return (
      <div
        className={`${
          isDarkMode ? "bg-[#140C00]" : "bg-[#F4F6F9]"
        } flex justify-center items-center min-h-screen`}
      >
        <p className={`${isDarkMode ? "text-white" : "text-[#353535]"}`}>
          Memuat data...
        </p>
      </div>
    );
  }

  return (
    <>
      <NavbarComponent />
      <div
        className={`${
          isDarkMode
            ? "bg-[#140c00] text-[#f0f0f0]"
            : "bg-[#f4f6f9] text-[#353535]"
        } p-4 pt-24 sm:pt-28 w-full min-h-screen`}
      >
        <div className="flex items-center gap-2 mb-4">
          <i
            className={`${
              isDarkMode ? "text-[#f0f0f0]" : "text-[#353535]"
            } bx bx-arrow-back text-xl md:text-2xl cursor-pointer`}
            onClick={() => navigate(-1)}
          ></i>
          <h1
            className={`${
              isDarkMode ? "text-[#f0f0f0]" : "text-[#353535]"
            } text-2xl font-bold`}
          >
            Akun saya
          </h1>
        </div>

        <div
          className={`${
            isDarkMode
              ? "bg-[#404040] text-[#f0f0f0]"
              : "bg-[#FFFFFF] text-[#353535]"
          } p-4 rounded-lg flex items-center mb-4 mt-4 justify-between`}
        >
          <div className="flex flex-col gap-2 font-bold">
            <div className="flex flex-row items-center gap-1">
              <i className="bx bx-user"></i>
              <h1 className="truncate max-w-[200px] sm:max-w-[300px] md:max-w-[400px] overflow-hidden text-ellipsis whitespace-nowrap">
                {user?.name}
              </h1>
            </div>

            <div className="flex flex-row items-center gap-1">
              <i className="bx bx-coin-stack"></i>
              <h1>{user?.BV}</h1>
            </div>

            <div className="flex flex-row items-center gap-1">
              <i className="bx bx-envelope"></i>
              <h1 className="truncate max-w-[200px] sm:max-w-[300px] md:max-w-[400px] overflow-hidden text-ellipsis whitespace-nowrap">
                {user?.email}
              </h1>
            </div>
          </div>
          <Link to="/akun">
            <i className="bx bx-right-arrow-alt text-2xl"></i>
          </Link>
        </div>

        <div
          className={`${
            isDarkMode
              ? "bg-[#404040] text-[#f0f0f0]"
              : "bg-[#FFFFFF] text-[#353535]"
          } p-4 rounded-lg flex items-center mb-4 mt-4 justify-between`}
        >
          Pesanan Saya
          <Link to="/my-order">
            <i className="bx bx-right-arrow-alt text-2xl"></i>
          </Link>
        </div>

        <div
          className={`${
            isDarkMode
              ? "bg-[#404040] text-[#f0f0f0]"
              : "bg-[#FFFFFF] text-[#353535]"
          } p-4 rounded-lg flex items-center mb-4 mt-4 justify-between`}
        >
          History Transaksi BV
          <Link to="/history-BV">
            <i className="bx bx-right-arrow-alt text-2xl"></i>
          </Link>
        </div>

        {user?.role === "admin" && (
          <div
            className={`${
              isDarkMode
                ? "bg-[#404040] text-[#f0f0f0]"
                : "bg-[#FFFFFF] text-[#353535]"
            } p-4 rounded-lg flex items-center mb-4 mt-4 justify-between`}
          >
            Dashboard
            <Link to="/dashboard">
              <i className="bx bx-right-arrow-alt text-2xl"></i>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
