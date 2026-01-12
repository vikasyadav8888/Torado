import React from "react";
import { useNavigate } from "react-router-dom";

const FilterShop = ({
  price,
  setPrice,
  colors,
  setColors,
  categories,
  setCategories,
  conditions,
  setConditions,
  onFilter, 
}) => {
  const toggleValue = (value, list, setList) => {
    
    setList(list.includes(value) ? [] : [value]);
  };
const navigate = useNavigate();
  return (
    <>
      <aside className="shop-filter-sidebar">
        {/* PRICE FILTER */}
        <div className="filter-box">
          <h3 className="filter-title">
            Filter By Price
            <span className="title-line"></span>
          </h3>
          <p className="price-range">$500 - ${price}</p>
          <input
            type="range"
            min="500"
            max="1000"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="price-slider"
          />
          <div className="price-values">
            <span>From: <b>$500</b></span>
            <span>To: <b>${price}</b></span>
          </div>
        </div>

        {/* COLOR FILTER */}
        <div className="filter-box">
          <h4>Color</h4>
          {["Red", "Green", "Blue", "Yellow", "Black", "Orange", "Pink", "Cyan"].map((c) => (
            <label className="checkbox-item" key={c}>
              <input
                type="checkbox"
                checked={colors.includes(c)}
                onChange={() => toggleValue(c, colors, setColors)}
              />
              <span></span>
              {c}
            </label>
          ))}
        </div>

        {/* ITEM CONDITION FILTER */}
        <div className="filter-box">
          <h4>Item Condition</h4>
          {["new", "hot", "offer"].map((cond) => {
            const labelMap = { new: "New", hot: "Sale", offer: "Offer" };
            return (
              <label className="checkbox-item" key={cond}>
                <input
                  type="checkbox"
                  checked={conditions.includes(labelMap[cond])}
                  onChange={() => toggleValue(labelMap[cond], conditions, setConditions)}
                />
                <span></span>
                {labelMap[cond]}
              </label>
            );
          })}
        </div>

        {/* FILTER BUTTON */}
        {onFilter && (
          <button className="filter-btn" onClick={onFilter}>
            Filter
          </button>
        )}
      </aside>

      {/* TOP CATEGORY OUTSIDE ASIDE */}
      <div className="top-category-wrapper">
        <div className="filter-box top-category-box">
          <h4>Top Category</h4>
          {["Machine Tools", "Hand Tools", "Abrasive", "Power Tools", "Measuring Tools"].map((cat) => (
            <label className="checkbox-item" key={cat}>
              <input
                type="checkbox"
                checked={categories.includes(cat)}
                onChange={() => toggleValue(cat, categories, setCategories)}
              />
              <span></span>
              {cat}
            </label>
          ))}
        </div>
      </div>
      <div className="quick-contact-box">
      <h3 className="quick-contact-title">
        Quick Contact To Help?
        <span className="quick-contact-underline"></span>
      </h3>

      <p className="quick-contact-text">
        Excepteur sint occaecat non culpa officia deserunt mollit anim laborum.
      </p>

      <button
        className="quick-contact-btn"
        onClick={() => navigate("/contact")}
      >
        Contact Us
      </button>
    </div>
    </>
  );
};

export default FilterShop;
