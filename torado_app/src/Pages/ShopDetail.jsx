import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaStar, FaRegStar } from "react-icons/fa";
import ProductTabs from "../Components/ProductTabs";

const ShopDetail = () => {
  const [pdProduct, setPdProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
  axios
    .get(`http://localhost:8000/api/product/${id}`)
    .then((res) => {
      setPdProduct(res.data.product);
    })
    .catch((err) => {
      console.error(err);
    });
}, [id]);

  if (!pdProduct) {
    return <div className="pd-loading-text">Loading...</div>;
  }

  /* ⭐ Dynamic Rating Logic */
  const pdRenderStars = (rating) => {
    const totalStars = 5;
    const filledStars = Math.floor(rating);

    return [...Array(totalStars)].map((_, index) =>
      index < filledStars ? (
        <FaStar key={index} className="pd-star-icon pd-star-filled" />
      ) : (
        <FaRegStar key={index} className="pd-star-icon" />
      )
    );
  };

  return (
    <>
      <section className="section-main2">
        <div className="pd-wrapper">
          {/* LEFT IMAGE */}
          <div className="pd-image-box">
            <img
              src={pdProduct.image}
              alt={pdProduct.title}
              className="pd-product-img"
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="pd-content-box">
            <div className="pd-price-row">
              <span className="pd-new-price">${pdProduct.price}</span>
              <span className="pd-old-price">${pdProduct.old_price}</span>
            </div>

            <h2 className="pd-product-title">{pdProduct.title}</h2>

            <div className="pd-rating-row">
              {pdRenderStars(Number(pdProduct.rating))}
              <span className="pd-rating-count">
                ({pdProduct.rating_count} Reviews)
              </span>
            </div>

            <p className="pd-short-desc">{pdProduct.short_description}</p>

            <ul className="pd-meta-list">
              <li><strong>Availability:</strong> {pdProduct.availability}</li>
              <li><strong>Category:</strong> {pdProduct.category_name}</li>
              <li><strong>Tags:</strong> {pdProduct.tags}</li>
              <li><strong>Brand:</strong> {pdProduct.brand}</li>
            </ul>

            <button className="pd-add-cart-btn">Add To Cart</button>
          </div>
        </div>
      </section>

     
      <ProductTabs productId={pdProduct.id} />
    </>
  );
};

export default ShopDetail;
