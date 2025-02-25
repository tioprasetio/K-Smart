import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useDarkMode } from "../context/DarkMode";

const PromoProduct = () => {
  const { isDarkMode } = useDarkMode();

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
      {/* <!-- Slide 1 --> */}
      <SwiperSlide>
        <div
          className={`${
            isDarkMode ? "bg-[#303030]" : "bg-[#ffffff]"
          } p-3 rounded-lg flex gap-4`}
        >
          <a className="flex justify-center items-center" href="">
            <img
              src="https://kmart-production.s3.ap-southeast-1.amazonaws.com/attachment/202402/07-jcldk2--46__DISKON_10_.jpg"
              alt="K-Omega Squa"
              className="h-10 w-full object-cover"
            />
          </a>
          <div className="flex-1">
            <div className="flex flex-col gap-2">
              <div
                className={`${
                  isDarkMode ? "text-[#f0f0f0]" : "text-[#353535]"
                } flex-1 font-bold text-md`}
              >
                <a className="inline-block" href="">
                  Promo Diskon 10% Pembelanjaan Customer
                </a>
              </div>
              <div className="text-[#959595] text-xs text-neutral-1 pl-1">
                <i className="bx bx-calendar"></i> Hingga December 31, 2025
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>

      {/* <!-- Slide 2 --> */}
      <SwiperSlide>
        <div
          className={`${
            isDarkMode ? "bg-[#303030]" : "bg-[#ffffff]"
          } p-3 rounded-lg flex gap-4`}
        >
          <a className="flex justify-center items-center" href="">
            <img
              src="https://kmart-production.s3.ap-southeast-1.amazonaws.com/attachment/202402/07-jcldk2--46__DISKON_10_.jpg"
              alt="K-Omega Squa"
              className="h-10 w-full object-cover"
            />
          </a>
          <div className="flex-1">
            <div className="flex flex-col gap-2">
              <div
                className={`${
                  isDarkMode ? "text-[#f0f0f0]" : "text-[#353535]"
                } flex-1 font-bold text-md`}
              >
                <a className="inline-block" href="">
                  Promo Diskon 10% Pembelanjaan Customer
                </a>
              </div>
              <div className="text-[#959595] text-xs text-neutral-1 pl-1">
                <i className="bx bx-calendar"></i> Hingga December 31, 2025
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default PromoProduct;
