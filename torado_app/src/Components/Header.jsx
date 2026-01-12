import React from "react";
import { FaSearch, FaMapMarkerAlt, FaHeadset } from "react-icons/fa";

const Header = () => {
  return (
    <>
      <section className="section-main">
        <div className=" td-top-header">
          {/* LOGO IMAGE */}
          <div className="td-logo">
            <img
              src="/src/assets/Images/logo.webp"
              alt="Torado Logo"
              className="td-logo-img"
            />
          </div>

          {/* SEARCH */}
          <div className="td-search-box">
            <select className="td-category-select">
              <option>Select a category</option>
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Grocery</option>
            </select>

            <input
              type="text"
              placeholder="Search Products"
              className="td-search-input"
            />

            <button className="td-search-btn">
              <FaSearch /> Search
            </button>
          </div>

          {/* LOCATION SELECT */}
          <div className="td-location">
            <FaMapMarkerAlt className="the-map" />

            <select className="td-location-select">
              <option>Your location</option>
              <option>New York</option>
              <option>Florida</option>
              <option>Georgia</option>
            </select>
          </div>

          {/* SUPPORT */}
          <div className="td-support">
            <FaHeadset className="head-phones" />
            <div>
              <strong className="blod-num">+0020 500</strong>
              <p className="opening">24/7 Support Center</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;
