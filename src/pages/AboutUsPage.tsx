import NavbarComponent from "../components/Navbar";
import { useDarkMode } from "../context/DarkMode";

const AboutUsPage = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className={`${isDarkMode ? "bg-[#140c00]" : "bg-[#f4f6f9]"} pt-16 sm:pt-24 overflow-x-hidden w-full min-h-screen`}>
      <NavbarComponent />
      <div className="p-6">
        <h1 className="text-3xl font-bold text-[#28a154]">Tentang Kami</h1>
        <div className={`${isDarkMode ? "bg-[#303030] text-[#f0f0f0]" : "bg-[#ffffff] text-[#353535]"} rounded-lg p-6 flex flex-col text-justify items-center gap-4 shadow-md mt-4`}>
          <img
            src="https://k-net.co.id/assets/images/logo.png"
            alt="logo"
            className="max-w-100%"
          />
          <p>
            <b>
              K-Link Nusantara merupakan perusahaan Digital Network Marketing
              pertama di Indonesia yang berbasis syariah.
            </b>
          </p>
          <p>
            Kami memberikan peluang bisnis online maupun offline dengan produk
            kesehatan, kecantikan dan rumah tangga. Mengikuti kemajuan
            teknologi, kami tidak hanya memiliki puluhan stokis yang tersebar di
            Indonesia namun juga menyediakan platform resmi k-net.co.id dan
            dnmmobile.com dalam memudahkan mitra untuk mendapatkan produk.
            Inilah beberapa alasan mengapa K-Link Nusantara diterima banyak
            orang.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
