import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Link } from "react-router";
import { useDarkMode } from "../context/DarkMode";

const categories = [
  { name: "Health Accessories", image: "/assets/images/health_accessories.png" },
  { name: "Health Drink", image: "/assets/images/healthDrink.png" },
  { name: "Body Care", image: "/assets/images/bodyCare.png" },
  { name: "Household", image: "/assets/images/houseHold.png" },
];

const Category = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className="mb-16">
      <Swiper
        modules={[Pagination]}
        slidesPerView={1}
        spaceBetween={10}
        loop={false}
        pagination={{ clickable: true }}
        breakpoints={{
          320: { slidesPerView: 2.3, spaceBetween: 10 },
          640: { slidesPerView: 4.3, spaceBetween: 20 },
          1024: { slidesPerView: 5.3, spaceBetween: 30 },
        }}
        className="mySwiper"
      >
        {categories.map((category, index) => (
          <SwiperSlide key={index}>
            <Link to={`/category/${encodeURIComponent(category.name)}`}>
              <div
                className={`${
                  isDarkMode ? "bg-[#303030]" : "bg-white"
                } p-4 rounded-lg text-center flex flex-col items-center min-h-[200px] justify-center`}
              >
                <img
                  src={category.image}
                  className="w-24 h-24 object-cover"
                  alt={category.name}
                />
                <h3
                  className={`${
                    isDarkMode ? "text-[#f0f0f0]" : "text-[#353535]"
                  } text-lg font-semibold mt-2`}
                >
                  {category.name}
                </h3>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Category;
