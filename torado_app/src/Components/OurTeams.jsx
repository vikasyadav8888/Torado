import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaPinterestP } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";


const OurTeam = () => {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/team/")
      .then((res) => setTeam(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
    <section className="section-main2">
    <section className="team-wrapper">
      <h2 className="team-title">Our Team</h2>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={3}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: { slidesPerView: 1 },
          576: { slidesPerView: 2 },
          992: { slidesPerView: 3 },
        }}
        className="team-slider"
      >
        {team.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="team-card">
              <div className="team-image">
                <img src={item.image} alt={item.name} />

                <div className="team-social">
                  {item.facebook && (
                    <a href={item.facebook} target="_blank" rel="noreferrer">
                      <FaFacebookF />
                    </a>
                  )}
                  {item.twitter && (
                    <a href={item.twitter} target="_blank" rel="noreferrer">
                      <FaTwitter />
                    </a>
                  )}
                  {item.linkedin && (
                    <a href={item.linkedin} target="_blank" rel="noreferrer">
                      <FaLinkedinIn />
                    </a>
                  )}
                  {item.pinterest && (
                    <a href={item.pinterest} target="_blank" rel="noreferrer">
                      <FaPinterestP />
                    </a>
                  )}
                </div>
              </div>

              <h3>{item.name}</h3>
              <p>{item.role}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
    </section>
    </>
  );
};

export default OurTeam;
