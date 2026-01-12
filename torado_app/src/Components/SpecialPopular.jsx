import React from "react";
import ProductColumn from "./ProductColumn";
import { popularProductsData, specialOfferData } from "../api/specialPopularData";


const SpecialPopular = () => {
  return (
    <div className="section-main2 sp-wrapper">
      <div className="row">
        {/* Left Side */}
        <div className="col-12 col-lg-6">
          <ProductColumn
            title="Special Offer"
            data={specialOfferData}
          />
        </div>

        {/* Right Side */}
        <div className="col-12 col-lg-6">
          <ProductColumn
            title="Popular Products"
            data={popularProductsData}
          />
        </div>
      </div>
    </div>
  );
};

export default SpecialPopular;
