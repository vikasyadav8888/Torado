import React from "react";
import { FaStar } from "react-icons/fa";

const ProductCard = ({ product }) => {
  return (
    <div className="sp-card">
      <div className="sp-img">
        <img src={product.img} alt={product.title} />
      </div>

      <div className="sp-content">
        <div className="sp-price">
          <span className="sp-new">{product.price}</span>
          <span className="sp-old">{product.oldPrice}</span>
        </div>

        <h4 className="sp-title">{product.title}</h4>

        <div className="sp-rating">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} />
          ))}
          <span>{product.rating}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
