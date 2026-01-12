import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";


const images = [
  "/src/assets/Images/partner-4.webp",
  "/src/assets/Images/partner-4.webp",
  "/src/assets/Images/partner-5.webp",
  "/src/assets/Images/partner-6.webp",
  "/src/assets/Images/partner-7.webp",
  "/src/assets/Images/partner-1.webp",
  "/src/assets/Images/partner-2.webp",
  "/src/assets/Images/partner-3.webp",
];

const PartnersLogo = () => {
  return (
    <>
    <section className="section-main2">
    <section className="slider-wrapper4">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={6}
        spaceBetween={20}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: { slidesPerView: 2 },
          576: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          992: { slidesPerView: 6 },
        }}
        className="image-slider4"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="slider-item4">
              <img src={img} alt={`slide-${index}`} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
    </section>
    </>
  );
};

export default PartnersLogo;
