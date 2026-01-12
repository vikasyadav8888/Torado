import { useState } from "react";
import flashDealsData from "../api/FleshdealData";
import { IoStar } from "react-icons/io5";

const FlashDeals = () => {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % flashDealsData.length);
  };

  const prev = () => {
    setIndex(
      (prev) => (prev - 1 + flashDealsData.length) % flashDealsData.length
    );
  };

  const visibleCards = [
    flashDealsData[index],
    flashDealsData[(index + 1) % flashDealsData.length],
  ];

  return (
    <>
      <section className="section-main2">
        <div className="row w-100">
          <div className="col-4">
            <section className="tf-wrapper">
              <div className="oc-text">
                <span className="oc-category">POPULAR NOW</span>
                <h2 className="oc-title">Good Quality Tools</h2>
                <button className="oc-btn">Shop Now</button>
              </div>

              <div className="tp-image">
                <img
                  src="/src/assets/Images/promo-img-4.webp"
                  alt="Magnetic Impact Power"
                />
              </div>
            </section>
          </div>
          <div className="col-8">
            <div className="fd-wrapper">
              {/* Header */}
              <div className="fd-header">
                <h2>Flash Deals</h2>
                <div className="fd-timer">End In 0d : 0h : 00m : 00s</div>

                <div className="fd-arrows">
                  <button onClick={prev}>❮</button>
                  <button onClick={next}>❯</button>
                </div>
              </div>

              {/* Cards */}
              <div className="fd-cards">
                {visibleCards.map((item) => (
                  <div className="fd-card" key={item.id}>
                    <div className="fd-img">
                      <img src={item.img} alt="" />
                    </div>

                    <div className="fd-content">
                      <div className="fd-price">
                        <span className="news">${item.price}</span>
                        <span className="old">${item.oldPrice}</span>
                      </div>

                      <h3>{item.title}</h3>

                      <div className="fd-rating">
                        {[...Array(5)].map((_, i) => (
                          <IoStar key={i} className="fd-star" />
                        ))}
                        <span>({item.reviews})</span>
                      </div>

                      <button className="fd-btn">Add To Cart</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FlashDeals;
