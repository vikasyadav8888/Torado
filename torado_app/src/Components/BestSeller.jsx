import React, { useState, useEffect, useRef } from "react";
import {
  FaExpand,
  FaChevronLeft,
  FaChevronRight,
  FaRegStar,
} from "react-icons/fa";
import { IoStar } from "react-icons/io5";
import { IoIosGitCompare, IoIosHeartEmpty } from "react-icons/io";
import products from "../api/Products";

const CARD_WIDTH = 345;
const visibleCards = 3;

const BestSeller = () => {
  // clone first & last
  const clonedProducts = [
    ...products.slice(-visibleCards),
    ...products,
    ...products.slice(0, visibleCards),
  ];

  const [index, setIndex] = useState(visibleCards);
  const [transition, setTransition] = useState(true);
  const trackRef = useRef(null);

  const nextSlide = () => {
    setIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    setIndex((prev) => prev - 1);
  };

  // handle infinite jump
  useEffect(() => {
    if (index === clonedProducts.length - visibleCards) {
      setTimeout(() => {
        setTransition(false);
        setIndex(visibleCards);
      }, 500);
    }

    if (index === 0) {
      setTimeout(() => {
        setTransition(false);
        setIndex(products.length);
      }, 500);
    }
  }, [index, clonedProducts.length]);

  // re-enable animation
  useEffect(() => {
    if (!transition) {
      requestAnimationFrame(() => {
        setTransition(true);
      });
    }
  }, [transition]);

  return (
    <section className="section-main2">
      <div className="bs-wrapper">
        {/* Header */}
        <div className="bs-header">
          <h2>Best Seller</h2>
          <div className="bs-nav">
            <button onClick={prevSlide}>
              <FaChevronLeft />
            </button>
            <button onClick={nextSlide}>
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Slider */}
        <div className="bs-slider">
          <div
            ref={trackRef}
            className="bs-track"
            style={{
              transform: `translateX(-${index * CARD_WIDTH}px)`,
              transition: transition ? "transform 0.5s ease" : "none",
            }}
          >
            {clonedProducts.map((item, idx) => {
              const filledStars = 4;
              const totalStars = 5;

              return (
                <div className="bs-card" key={idx}>
                  <span className={`bs-tag ${item.tagType}`}>
                    {item.tag}
                  </span>

                  <div className="bs-hover-icons">
                    <button><IoIosHeartEmpty /></button>
                    <button><IoIosGitCompare /></button>
                    <button><FaExpand /></button>
                  </div>

                  <img src={item.image} alt={item.title} />

                  <div className="bs-content">
                    <div className="bs-price">
                      ${item.price} <span>${item.oldPrice}</span>
                    </div>

                    <h3>{item.title}</h3>

                    <div className="bs-rating">
                      {[...Array(totalStars)].map((_, i) =>
                        i < filledStars ? (
                          <IoStar key={i} className="bs-star filled" />
                        ) : (
                          <FaRegStar key={i} className="bs-star empty" />
                        )
                      )}
                      <span>({item.rating})</span>
                    </div>

                    <button className="bs-cart-btn">
                      Add To Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSeller;
