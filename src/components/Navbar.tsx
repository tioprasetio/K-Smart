import "flowbite/dist/flowbite.min.js";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import "flowbite";
import { useDarkMode } from "../context/DarkMode";
import { useCart } from "../context/CartContext";
import { logoutUser } from "../api/auth/authService";

const NavbarComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { cart, clearCart } = useCart();

  const { isDarkMode, setIsDarkMode } = useDarkMode();

  // Cek apakah user sudah login (ada data di localStorage)
  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user); // Jika ada user, set isLoggedIn = true
  }, []);

  // Fungsi Logout
  const handleLogout = async () => {
    try {
      await logoutUser(); // Panggil fungsi logout dari authService
      clearCart(); // Kosongkan state cart
      setIsLoggedIn(false);
      window.location.assign("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    import("flowbite").then((flowbite) => {
      if (flowbite && flowbite.initFlowbite) {
        flowbite.initFlowbite();
      }
    });
  }, []);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav
      className={`${
        isDarkMode ? "bg-[#140c00]" : "bg-white"
      } border-gray-200 fixed top-0 left-0 w-full z-999 shadow-md`}
    >
      <div className="w-full flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-2 rtl:space-x-reverse px-3"
        >
          <img
            src="https://k-net.co.id/assets/images/logo.png"
            className="h-8"
            alt="K-Link"
          />
          <span
            className={`${
              isDarkMode ? "text-[#f0f0f0]" : "text-[#353535]"
            } self-center text-2xl font-semibold whitespace-nowrap`}
          >
            K-Smart
          </span>
        </Link>

        {/* Cart Button + Hamburger Menu */}
        <div className="flex items-center gap-3 md:hidden">
          {/* Cart Button */}
          <Link
            to="/cart"
            className={`${
              isDarkMode
                ? "text-[#f0f0f0] bg-[#303030]"
                : "text-[#353535] bg-[#f0f0f0]"
            } flex items-center justify-center cursor-pointer py-2 px-3 hover:text-white hover:bg-[#28a154] rounded-sm text-center`}
          >
            <i className="bx bxs-cart-add text-xl"></i>
            {totalItems > 0 ? `(${totalItems})` : ""}
          </Link>

          {/* Hamburger Menu */}
          <button
            data-collapse-toggle="navbar-multi-level"
            type="button"
            className={`${
              isDarkMode
                ? "text-[#f0f0f0] bg-[#303030]"
                : "text-[#353535] bg-[#f0f0f0]"
            } flex items-center justify-center cursor-pointer py-2 px-3 hover:text-white hover:bg-[#28a154] rounded-sm text-center`}
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
        </div>

        <div
          className="hidden w-full md:block md:w-auto"
          id="navbar-multi-level"
        >
          <ul
            className={`${
              isDarkMode
                ? "text-[#f0f0f0] bg-[#292929] md:bg-[#140c00] border-[#03180b]"
                : "text-[#353535] bg-gray-50 md:bg-white border-gray-100"
            } flex text-base flex-col md:flex-row md:items-center w-full md:w-auto space-y-2 md:space-y-0 md:space-x-2 font-medium p-4 md:p-0 mt-4 border rounded-lg md:mt-0 md:border-0`}
          >
            <li>
              <Link
                to="/"
                className={`${
                  isDarkMode
                    ? "text-[#f0f0f0] bg-[#140c00]"
                    : "text-[#353535] bg-white"
                } block py-2 px-3 hover:text-white hover:bg-[#28a154] rounded-sm`}
                aria-current="page"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/about-us"
                className={`${
                  isDarkMode
                    ? "text-[#f0f0f0] bg-[#140c00]"
                    : "text-[#353535] bg-white"
                } block py-2 px-3 hover:text-white hover:bg-[#28a154] rounded-sm`}
                aria-current="page"
              >
                Tentang Kami
              </Link>
            </li>

            <li className="w-full md:w-auto">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className={`${
                    isDarkMode
                      ? "text-[#f0f0f0] bg-[#cb2525]"
                      : "text-[#f0f0f0] bg-[#cb2525]"
                  } cursor-pointer block py-2 px-3 text-center hover:text-white w-full md:w-auto hover:bg-[#cb2525] rounded-sm`}
                >
                  Logout
                </button>
              ) : (
                <Link to="/login" className="w-full md:w-auto block">
                  <button
                    type="button"
                    className={`${
                      isDarkMode
                        ? "text-[#f0f0f0] bg-[#28a154]"
                        : "text-[#f0f0f0] bg-[#28a154]"
                    } cursor-pointer block py-2 px-3 text-center hover:text-white w-full md:w-auto hover:bg-[#167e3c] rounded-sm`}
                  >
                    Login
                  </button>
                </Link>
              )}
            </li>
            <li>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`${
                  isDarkMode
                    ? "text-[#f0f0f0] bg-[#303030]"
                    : "text-[#353535] bg-[#f0f0f0]"
                } cursor-pointer block py-2 px-3 text-center hover:text-white w-full md:w-auto hover:bg-[#28a154] rounded-sm`}
              >
                {isDarkMode ? (
                  <i className="bx bxs-sun"></i>
                ) : (
                  <i className="bx bxs-moon"></i>
                )}
              </button>
            </li>
            <li>
              <Link
                to="/cart"
                className={`${
                  isDarkMode
                    ? "text-[#f0f0f0] bg-[#303030]"
                    : "text-[#353535] bg-[#f0f0f0]"
                } hidden cursor-pointer md:block py-2 px-3 hover:text-white w-full md:w-auto hover:bg-[#28a154] rounded-sm text-center`}
              >
                <i className="bx bxs-cart-add"></i>
                {totalItems > 0 ? `(${totalItems})` : ""}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
