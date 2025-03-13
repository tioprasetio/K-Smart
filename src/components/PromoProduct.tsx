import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useDarkMode } from "../context/DarkMode";
import { useVouchers } from "../context/VoucherContext";
import { useNavigate } from "react-router-dom";
import { Voucher } from "../data/vouchers";

const PromoProduct = () => {
  const { isDarkMode } = useDarkMode();
  const { vouchers } = useVouchers();
  const navigate = useNavigate();

  //Membuat slug dari nama produk
  const generateSlug = (name: string) =>
    name.toLowerCase().replace(/\s+/g, "-");

  const handleClick = (voucher: Voucher) => {
    navigate(`/voucher/${generateSlug(voucher.code)}`, { state: voucher });
  };

  return (
    <Swiper
      pagination={{ clickable: true }}
      loop={false}
      modules={[Pagination]}
      slidesPerView={1}
      spaceBetween={10}
      breakpoints={{
        320: { slidesPerView: 1.1, spaceBetween: 10 },
      }}
      className="promoSwiper"
    >
      {/* Map data promo ke dalam SwiperSlide */}
      {vouchers.map((voucher, index) => (
        <SwiperSlide key={index}>
          <div
            className={`${
              isDarkMode ? "bg-[#303030]" : "bg-[#ffffff]"
            } p-3 rounded-lg flex gap-4 cursor-pointer`}
          >
            <div className="flex justify-center items-center">
              <img
                src={voucher.image}
                alt={`Promo ${voucher.code}`}
                className="h-10 w-full object-cover cursor-pointer"
                onClick={() => handleClick(voucher)}
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-col gap-2">
                <div
                  className={`${
                    isDarkMode ? "text-[#f0f0f0]" : "text-[#353535]"
                  } flex-1 font-bold text-md`}
                >
                  <button
                    onClick={() => handleClick(voucher)}
                    className="inline-block cursor-pointer text-left"
                  >
                    Promo Diskon {voucher.discount}% Pembelanjaan Customer{" "}
                    {/* Tampilkan diskon */}
                  </button>
                </div>
                <div className="text-[#959595] text-xs text-neutral-1 pl-1">
                  <i className="bx bx-calendar"></i> Kode: {voucher.code}{" "}
                  {/* Tampilkan kode promo */}
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default PromoProduct;
