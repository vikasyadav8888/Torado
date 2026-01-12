import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { FaInstagram } from "react-icons/fa";
import "swiper/css";
import images from "../api/Images";

const ImageSlider = () => {
  return (
    <>
    <section className="section-main2">
    <div className="is-wrapper">
      <Swiper
        modules={[Autoplay]}
        loop={true}
        speed={3000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        slidesPerView={6}
        spaceBetween={20}
        breakpoints={{
          1200: { slidesPerView: 6 },
          992: { slidesPerView: 4 },
          768: { slidesPerView: 3 },
          576: { slidesPerView: 2 },
          0: { slidesPerView: 1 },
        }}
        className="is-swiper"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="is-card">
              <img src={img} alt="instagram" />
              <div className="is-overlay">
                <FaInstagram />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    </section>
    </>
  );
};

export default ImageSlider;
