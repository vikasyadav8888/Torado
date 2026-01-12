import React from "react";

const NewArrivals = () => {
  return (
    <>
      <section className="section-main2">
        <section className="new-arrival">
          <div className="row">
            <div className="col-3"></div>

            <div className="col-6">
              <section className="new-stock">
                <div className="new-stock-inner">
                  {/* Left Content */}
                  <div className="stock-left">
                    <span className="stock-tag">NEW IN STOCK</span>

                    <h2 className="stock-title">
                      All Types Of Premium Quality Tools
                    </h2>

                    <p className="stock-desc">
                      Free shipping & discount 50% on products
                    </p>

                    <button className="shop-btn">Shop Now</button>

                    <p className="stock-price">
                      From <span>$20.14</span>
                    </p>
                  </div>

                  {/* Right Content */}
                  <div className="stock-right">
                    <div className="image-wrapper image-bottom-right">
                      <img
                        src="/src/assets/Images/hero-img-1.webp"
                        alt="Tools"
                      />

                      <div className="discount-badge">
                        10%
                        <br />
                        OFF
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="col-3">
              <div className="offer-container">
                {/* Card 1 */}
                <div className="offer-card offer-one">
                  <div className="offer-text">
                    <span className="offer-tag">SPECIAL OFFER</span>
                    <h2>New Lower Prices</h2>
                    <button className="offer-btn">Shop Now</button>
                  </div>

                  <img
                    src="/src/assets/Images/hero-img-2.webp"
                    alt="offer"
                    className="offer-img"
                  />
                </div>

                {/* Card 2 */}
                <div className="offer-card offer-two">
                  <div className="offer-text">
                    <span className="offer-tag">BEST DEALS</span>
                    <h2>Socket Wrenches</h2>
                    <button className="offer-btn">Shop Now</button>
                  </div>

                  <img
                    src="/src/assets/Images/hero-img-3.webp"
                    alt="deal"
                    className="offer-img"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default NewArrivals;
