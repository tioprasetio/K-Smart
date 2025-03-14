import { useDarkMode } from "../context/DarkMode";
import { useUser } from "../context/UserContext";

const NavDashboard = () => {
  const { isDarkMode, setIsDarkMode } = useDarkMode();

  const { user } = useUser(); // Ambil data user dari UserContext
  const userName = user?.name ?? "Tidak tersedia"; // Nama user dari UserContext
  const userEmail = user?.email ?? "Tidak tersedia"; // Email user dari UserContext

  return (
    <nav
      className={`${
        isDarkMode ? "bg-[#303030]" : "bg-[#FFFFFF]"
      } fixed top-0 z-50 w-full`}
    >
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
            <a href="/" className="flex ms-2 md:me-24 items-center">
              <img
                src="https://k-net.co.id/assets/images/logo.png"
                className="h-8 me-3"
                alt="FlowBite Logo"
              />
              <span
                className={`${
                  isDarkMode ? "text-[#f0f0f0]" : "text-[#353535]"
                } self-center text-xl font-semibold sm:text-2xl whitespace-nowrap`}
              >
                K-Smart
              </span>
            </a>
          </div>
          <div className="flex items-center">
            <div>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`${
                  isDarkMode
                    ? "text-[#f0f0f0] bg-[#404040]"
                    : "text-[#353535] bg-[#f0f0f0]"
                } cursor-pointer block py-2 px-3 text-center hover:text-white w-full md:w-auto hover:bg-[#28a154] rounded-sm`}
              >
                {isDarkMode ? (
                  <i className="bx bxs-sun"></i>
                ) : (
                  <i className="bx bxs-moon"></i>
                )}
              </button>
            </div>
            <div className="flex items-center ms-3">
              <div>
                <button
                  type="button"
                  className="flex cursor-pointer text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  aria-expanded="false"
                  data-dropdown-toggle="dropdown-user"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    alt="user photo"
                  />
                </button>
              </div>
              <div
                className={`${
                  isDarkMode
                    ? "bg-[#202020] divide-gray-600"
                    : "bg-[#FFFFFF] divide-gray-100 text-[#353535]"
                } z-50 hidden my-4 text-base list-none divide-y rounded-sm shadow-sm`}
                id="dropdown-user"
              >
                <div className="px-4 py-3" role="none">
                  <p
                    className={`${
                      isDarkMode ? "text-[#f0f0f0]" : "text-[#353535]"
                    } text-sm`}
                    role="none"
                  >
                    {userName}
                  </p>
                  <p
                    className={`${
                      isDarkMode ? "text-[#f0f0f0]" : "text-[#353535]"
                    } text-sm truncate font-medium`}
                    role="none"
                  >
                    {userEmail}
                  </p>
                </div>
                <ul className="py-1" role="none">
                  <li>
                    <a
                      href="#"
                      className={`${
                        isDarkMode
                          ? "text-[#f0f0f0] hover:bg-gray-600"
                          : "text-[#353535] hover:bg-gray-600 hover:text-white"
                      } text-sm block px-4 py-2`}
                      role="menuitem"
                    >
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className={`${
                        isDarkMode
                          ? "text-[#f0f0f0] hover:bg-gray-600"
                          : "text-[#353535] hover:bg-gray-600 hover:text-white"
                      } text-sm block px-4 py-2`}
                      role="menuitem"
                    >
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className={`${
                        isDarkMode
                          ? "text-[#f0f0f0] hover:bg-gray-600"
                          : "text-[#353535] hover:bg-gray-600 hover:text-white"
                      } text-sm block px-4 py-2`}
                      role="menuitem"
                    >
                      Earnings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className={`${
                        isDarkMode
                          ? "text-[#f0f0f0] hover:bg-gray-600"
                          : "text-[#353535] hover:bg-gray-600 hover:text-white"
                      } text-sm block px-4 py-2`}
                      role="menuitem"
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavDashboard;
