import "flowbite/dist/flowbite.min.js";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import "flowbite";

const NavbarComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Cek apakah user sudah login (ada data di localStorage)
  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user); // Jika ada user, set isLoggedIn = true
  }, []);

  // Fungsi Logout
  const handleLogout = () => {
    localStorage.removeItem("user"); // Hapus data user dari localStorage
    setIsLoggedIn(false); // Ubah state menjadi logout
    navigate("/login"); // Arahkan kembali ke halaman login
  };

  useEffect(() => {
    import("flowbite").then((flowbite) => {
      if (flowbite && flowbite.initFlowbite) {
        flowbite.initFlowbite();
      }
    });
  }, []);

  return (
    <nav className="bg-white border-gray-200 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-2 rtl:space-x-reverse px-3"
        >
          <img
            src="https://k-net.co.id/assets/images/logo.png"
            className="h-8"
            alt="K-Link"
          />
          <span className="text-gray-900 self-center text-2xl font-semibold whitespace-nowrap">
            K-Smart
          </span>
        </Link>

        <button
          data-collapse-toggle="navbar-multi-level"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-200"
          aria-controls="navbar-multi-level"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className="hidden w-full md:block md:w-auto"
          id="navbar-multi-level"
        >
          <ul className="flex md:items-center flex-wrap space-x-2 flex-col md:flex-row font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-grey-300 hover:text-white hover:bg-[#28a154] bg-white rounded-sm"
                aria-current="page"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-grey-300 hover:text-white hover:bg-[#28a154] bg-white rounded-sm"
                aria-current="page"
              >
                Tentang Kami
              </Link>
            </li>

            <li>
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="text-white cursor-pointer bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                >
                  Logout
                </button>
              ) : (
                <Link to="/login">
                  <button
                    type="button"
                    className="text-white cursor-pointer bg-[#28a154] hover:bg-[#167e3c] focus:ring-4 focus:outline-none focus:ring-[#3ab065] font-medium rounded-lg text-sm px-4 py-2 text-center"
                  >
                    Login
                  </button>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
