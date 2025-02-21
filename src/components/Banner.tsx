import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const Banner = () => {
  return (
    <div className="bg-[#f4f6f9] w-full mb-8">
      <div className="mx-auto">
        {/* Swiper Container */}
        <Swiper
          spaceBetween={20}
          centeredSlides={true}
          autoplay={{
            delay: 3000, // Auto geser setiap 3 detik
            disableOnInteraction: false,
          }}
          loop={false} // Looping agar tak berhenti di slide terakhir
          modules={[Autoplay]}
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <img
              src="/assets/images/promo.png"
              alt="Promo 1"
              className="w-full h-auto rounded-lg"
            />
          </SwiperSlide>
          {/* Slide 2 */}
          <SwiperSlide>
            <img
              src="/assets/images/kirimBarang.png"
              alt="Promo 2"
              className="w-full h-auto rounded-lg"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
