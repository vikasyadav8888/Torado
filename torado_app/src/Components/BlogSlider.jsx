import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import {
  FaChevronLeft,
  FaChevronRight,
  FaUser,
  FaCalendar,
} from "react-icons/fa";
import "swiper/css";
import blogs from "../api/blogData";

const BlogSlider = () => {
  const swiperRef = useRef(null);

  return (
    <>
      <section className="section-main2">
        <div className="bb-wrapper">
          {/* Header */}
          <div className="bb-header">
            <h2>From The Blog</h2>

            <div className="bb-nav">
              <button onClick={() => swiperRef.current.slidePrev()}>
                <FaChevronLeft />
              </button>
              <button onClick={() => swiperRef.current.slideNext()}>
                <FaChevronRight />
              </button>
            </div>
          </div>

          {/* Slider */}
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            modules={[Navigation]}
            loop={true}
            spaceBetween={24}
            slidesPerView={3}
            breakpoints={{
              1200: { slidesPerView: 3 },
              992: { slidesPerView: 2 },
              576: { slidesPerView: 1 },
            }}
          >
            {blogs.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="bb-card">
                  <div className="bb-img">
                    <img src={item.img} alt="blog" />
                  </div>

                  <div className="bb-meta">
                    <span>
                      <FaUser /> {item.author}
                    </span>
                    <span>
                      <FaCalendar /> {item.date}
                    </span>
                  </div>

                  <h3 className="bb-title">{item.title}</h3>

                  <button className="fd-btn">Read More</button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default BlogSlider;
