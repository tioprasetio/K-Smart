import NavbarComponent from "../components/Navbar";

const AboutUsPage = () => {
  return (
    <div className="bg-[#f4f6f9] pt-16 sm:pt-24 overflow-x-hidden w-full min-h-screen">
      <NavbarComponent />
      <div className="bg-[#f4f6f9] p-6">
        <h1 className="text-3xl font-bold text-[#28a154]">Tentang Kami</h1>
        <div className="card bg-white p-6 rounded-lg flex flex-col text-justify items-center gap-4 shadow-md mt-4 text-[#353535]">
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
