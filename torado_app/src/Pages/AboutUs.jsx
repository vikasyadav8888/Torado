import React, { useEffect, useState } from "react";
import axios from "axios";
import { BiSolidQuoteRight } from "react-icons/bi";
import WhyChooseUs from "../Components/why_choose_us";
import OurTeam from "../Components/OurTeams";
import PartnersLogo from "../Components/PartnersLogo";
import BannerTop from "../Components/BannerTop";

const AboutUs = () => {
  const [story, setStory] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/about_story/")
      .then((response) => {
        setStory(response.data[0]);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load About Us data");
      });
  }, []);

  if (error) return <p>{error}</p>;
  if (!story) return <p>Loading...</p>;

  return (
    <>
    <BannerTop/>
      <section className="section-main2">
        <section className="as-wrapper">
          <div className="as-container">
            <div className="as-image">
              <img src={story.image} alt="Our Story" />
            </div>

            <div className="as-content">
              <h2>{story.title}</h2>

              <p>{story.description1}</p>
              <p>{story.description2}</p>

              <div className="as-quote">
                <span>
                  <BiSolidQuoteRight />
                </span>
                <p>{story.quote}</p>
              </div>

              <div className="as-founder">
                <h4>{story.founder_name}</h4>
                <span>{story.founder_role}</span>
              </div>
            </div>
          </div>
        </section>
      </section>
      <WhyChooseUs />
      <OurTeam/>
      <PartnersLogo/>
    </>
  );
};

export default AboutUs;
