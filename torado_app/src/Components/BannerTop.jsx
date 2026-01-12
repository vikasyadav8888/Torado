import React from "react";


const BannerTop = () => {
  return (
    <section className="about-hero">
      <div className="about-hero-overlay"></div>

      <div className="about-hero-content">
        <h1>About Us</h1>
        <p>
          Home <span>/</span> <span className="active">About Us</span>
        </p>
      </div>
    </section>
  );
};

export default BannerTop;
