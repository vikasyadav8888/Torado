import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import categories from "../api/Catagory";

const TrandingCategory = () => {
  const [index, setIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(220);
  const trackRef = useRef(null);

  // Duplicate array for infinite loop effect
  const slides = [...categories, ...categories];

  // Update card width based on screen size
  useEffect(() => {
    const updateCardWidth = () => {
      const width = window.innerWidth;
      if (width <= 480) setCardWidth(160);
      else if (width <= 768) setCardWidth(180);
      else if (width <= 1024) setCardWidth(200);
      else setCardWidth(220);
    };

    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);
    return () => window.removeEventListener("resize", updateCardWidth);
  }, []);

  const handleNext = () => setIndex((prev) => prev + 1);
  const handlePrev = () => setIndex((prev) => prev - 1);

  // Infinite loop logic
  useEffect(() => {
    const total = categories.length;
    if (index < 0) {
      const timer = setTimeout(() => setIndex(total - 1), 300);
      return () => clearTimeout(timer);
    } else if (index >= total) {
      const timer = setTimeout(() => setIndex(0), 300);
      return () => clearTimeout(timer);
    }
  }, [index]);

  return (
    <section className="section-main2">
      <div className="tc-wrapper">
        <div className="tc-header">
          <h2>Trending Categories</h2>
          <div className="tc-arrows">
            <button onClick={handlePrev}>
              <FaChevronLeft />
            </button>
            <button onClick={handleNext}>
              <FaChevronRight />
            </button>
          </div>
        </div>

        <div className="tc-slider">
          <div
            className="tc-track"
            ref={trackRef}
            style={{
              transform: `translateX(-${index * (cardWidth + 20)}px)`,
              transition: "transform 0.45s ease-in-out",
            }}
          >
            {slides.map((item, i) => {
              const Icon = item.icon;
              return (
                <div className="tc-card" key={i}>
                  <div className="tc-icon"><Icon /></div>
                  <h4>{item.title}</h4>
                  <p>({item.items} Items)</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrandingCategory;
