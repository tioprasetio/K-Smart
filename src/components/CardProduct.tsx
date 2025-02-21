import { Link } from "react-router-dom";
import Btn from "./Btn";

type CardProductProps = {
  id: number;
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
};

const CardProduct = (props: CardProductProps) => {
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
  console.log("ID DARI CARD PRODUCT", id);

  const productSlug = name.toLowerCase().replace(/\s+/g, "-");
  return (
    <>
      {/* <!-- Card Produk 1 --> */}
      <div className="bg-white rounded-lg shadow-lg flex flex-col items-center text-center justify-between">
        {/* <!-- Gambar Produk --> */}
        <img src={picture} alt="Produk" className="w-full object-cover" />

        <div className="p-4 w-full">
          {/* <!-- Kode Produk --> */}
          {/* <!-- <p className="text-[#353535] text-sm font-semibold">HD012</p> --> */}
          {/* <!-- Nama Produk --> */}
          <h3 className="text-lg text-left font-normal text-[#353535] mt-2">
            {name}
          </h3>

          {/* <!-- Harga --> */}
          <div className="flex flex-row w-full mt-2 text-sm">
            <div className="flex flex-col text-left gap-1">
              <div className="flex flex-row items-center">
                <span className="text-[#353535] text-base font-bold">
                  Rp{harga?.toLocaleString()}
                </span>
                <span className="text-[#353535] text-xs">&nbsp;/ pcs</span>
              </div>

              {terjual ? (
                <div className="flex flex-row items-center">
                  <span className="text-[#959595] text-lg">
                    <i className="bx bxs-star text-xl text-[#FFD52DFF]"></i>{" "}
                    {rate}
                  </span>
                  <span className="text-[#959595] text-lg px-1">|</span>
                  <span className="text-[#959595] text-lg">
                    Terjual {terjual}
                  </span>
                </div>
              ) : (
                <div className="flex flex-row items-center">
                  <span className="text-[#959595] text-lg">
                    <i className="bx bxs-star text-xl text-[#FFD52DFF]"></i>{" "}
                    {rate}
                  </span>
                  <span className="text-[#959595] text-lg px-1">|</span>
                  <span className="text-[#959595] text-lg">Terjual -</span>
                </div>
              )}
            </div>
          </div>

          {/* <!-- Button Masukkan Keranjang --> */}
          <Link
            to={`/product/${id}`}
            state={{
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
            }}
          >
            <Btn>Lihat</Btn>
          </Link>
        </div>
      </div>
      {/* <!-- End Card Produk --> */}
    </>
  );
};

export default CardProduct;
