import { useNavigate } from "react-router";
import Btn from "./Btn";
import { useDarkMode } from "../context/DarkMode";

type CardProductProps = {
  name?: string;
  harga: number;
  picture?: string;
  rate?: string;
  terjual: number;
  beratPengiriman: number;
  beratBersih: number;
  pemesananMin: number;
  deskripsi: string;
  category: string;
  id: number;
};

const CardProduct = (props: CardProductProps) => {
  const { isDarkMode } = useDarkMode();

  const {
    name = "Unknown",
    picture,
    harga,
    rate,
    terjual,
    beratPengiriman,
    beratBersih,
    pemesananMin,
    deskripsi,
    category,
    id,
  } = props;
  // console.log('card product=',name);

  const navigate = useNavigate();
  const productSlug = name?.toLowerCase().replace(/\s+/g, "-");

  const isLoggedIn = localStorage.getItem("user"); // Asumsi user tersimpan di localStorage

  const handleClick = () => {
    if (!isLoggedIn) {
      navigate("/login"); // Redirect ke halaman login jika belum login
    } else {
      navigate(`/product/${id}-${productSlug}`, {
        state: {
          id,
          name,
          harga,
          picture,
          rate,
          terjual,
          beratPengiriman,
          beratBersih,
          pemesananMin,
          deskripsi,
          category,
        },
      });
    }
  };
  return (
    <>
      {/* <!-- Card Produk 1 --> */}
      <div
        className={`${
          isDarkMode ? "bg-[#303030]" : "bg-white"
        } rounded-lg shadow-lg flex flex-col items-center text-center justify-between`}
      >
        {/* <!-- Gambar Produk --> */}
        <img src={picture} alt="Produk" className="w-full object-cover" />

        <div className="p-4 w-full">
          {/* <!-- Kode Produk --> */}
          {/* <!-- <p className="text-[#353535] text-sm font-semibold">HD012</p> --> */}
          {/* <!-- Nama Produk --> */}
          <h3
            className={`${
              isDarkMode ? "text-[#f0f0f0]" : "text-[#353535]"
            } text-lg text-left font-normal mt-2`}
          >
            {name}
          </h3>

          {/* <!-- Harga --> */}
          <div className="flex items-center flex-row w-full mt-2 text-sm">
            <div className="flex flex-col text-left gap-1">
              <div className="flex flex-row items-center">
                <span
                  className={`${
                    isDarkMode ? "text-[#f0f0f0]" : "text-[#353535]"
                  } text-base font-bold`}
                >
                  Rp{harga?.toLocaleString()}
                </span>
                <span className="text-[#353535] text-xs">&nbsp;/ pcs</span>
              </div>

              {terjual ? (
                <div className="flex flex-row items-center">
                  <span className="text-[#959595] text-sm">
                    <i className="bx bxs-star text-sm text-[#FFD52DFF]"></i>{" "}
                    {rate}
                  </span>
                  <span className="text-[#959595] text-sm px-1">|</span>
                  <span className="text-[#959595] text-sm">
                    Terjual {terjual}
                  </span>
                </div>
              ) : (
                <div className="flex flex-row items-center">
                  <span className="text-[#959595] text-sm">
                    <i className="bx bxs-star text-xl text-[#FFD52DFF]"></i>{" "}
                    {rate}
                  </span>
                  <span className="text-[#959595] text-lg px-1">|</span>
                  <span className="text-[#959595] text-sm">Terjual -</span>
                </div>
              )}
            </div>
          </div>

          {/* <!-- Button Masukkan Keranjang --> */}
          <Btn onClick={handleClick}>Lihat</Btn>
        </div>
      </div>
      {/* <!-- End Card Produk --> */}
    </>
  );
};

export default CardProduct;
