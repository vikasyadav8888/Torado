import React from "react";
import { SlSocialDropbox } from "react-icons/sl";
import { RiRefund2Line } from "react-icons/ri";
import { LiaAmazonPay } from "react-icons/lia";
import { FaUndoAlt, FaMoneyBillWave } from "react-icons/fa";

const FeatureCards = () => {
  return (
    <>
      <section className="section-main2">
        <div className="fc-wrapper">
          {/* Card 1 */}
          <div className="fc-card">
            <div className="fc-icon">
              <SlSocialDropbox />
            </div>
            <div className="fc-detail">
              <h3 className="fc-title">Worldwide Shipping</h3>
              <p className="fc-desc">24/7 customer support available</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="fc-card">
            <div className="fc-icon">
              <RiRefund2Line />
            </div>
            <div className="fc-detail">
              <h3 className="fc-title">Easy 30 Days Return</h3>
              <p className="fc-desc">Pay with the world's top payment</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="fc-card">
            <div className="fc-icon">
              <LiaAmazonPay />
            </div>
            <div className="fc-detail">
              <h3 className="fc-title">Money Back Guarantee</h3>
              <p className="fc-desc">Pay through most trusted method</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeatureCards;
