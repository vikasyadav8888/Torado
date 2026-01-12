import React from "react";
import manToolbox from "../assets/Images/promo-img-1.webp";
import womanDrill from "../assets/Images/promo-img-2.webp";

const OfferCards = () => {
  return (
    <section className="section-main2">
      <div className="oc-wrapper">
        {/* Card 1 */}
        <div className="oc-card oc-card-new">
          <div className="oc-text">
            <span className="oc-category">NEW ARRIVALS</span>
            <h3 className="oc-title">Wall Polishing Square Box</h3>
            <p className="oc-subtitle">In accessories At Best Price</p>
            <button className="oc-btn">Shop Now</button>
          </div>

          <div className="oc-image">
            <img src={manToolbox} alt="Wall Polishing Square Box" />
            <span className="oc-discount m-0 p-0">10%<br/> Off</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="oc-card oc-card-flash">
          <div className="oc-text">
            <span className="oc-category">FLASH DEALS</span>
            <h3 className="oc-title">Adjustable Hand Rubber Tools</h3>
            <p className="oc-subtitle">In accessories At Best Price</p>
            <button className="oc-btn">Shop Now</button>
          </div>

          <div className="oc-image">
            <img src={womanDrill} alt="Adjustable Hand Rubber Tools" />
            <span className="oc-discount2 m-0 p-0">20% <br/>Off</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferCards;
