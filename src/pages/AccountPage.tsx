import { Link } from "react-router-dom";
import NavbarComponent from "../components/Navbar";
import ProfileForm from "../components/ProfileForm";
import { useDarkMode } from "../context/DarkMode";

const AccountPage = () => {
  const { isDarkMode } = useDarkMode();
  return (
    <>
      <NavbarComponent />
      <div
        className={`${
          isDarkMode
            ? "bg-[#140c00] text-[#f0f0f0]"
            : "bg-[#f4f6f9] text-[#353535]"
        } p-6 pt-24 w-full flex items-center justify-center`}
      >
        <div
          className={`${
            isDarkMode ? "bg-[#303030]" : "bg-white"
          } w-full max-w-md p-8 shadow-md rounded-lg`}
        >
          <div className="text-2xl font-bold text-center mb-6 flex items-center justify-center">
            <Link to="/">
              <img
                src="https://k-net.co.id/assets/images/logo.png"
                className="h-8 inline-block"
                alt="K-Link"
              />
              <span
                className={`${
                  isDarkMode ? "text-[#f0f0f0]" : "text-[#353535]"
                } inline-block`}
              >
                Edit Profil K-Smart
              </span>
            </Link>
          </div>
          <ProfileForm />
        </div>
      </div>
    </>
  );
};

export default AccountPage;
