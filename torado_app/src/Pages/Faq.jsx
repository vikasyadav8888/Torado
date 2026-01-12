import React, { useEffect, useState } from "react";
import axios from "axios";
import FaqItem from "../Components/FaqItems";

const Faq = () => {
  const [faq, setFaq] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8000/api/faqs/")
      .then(res => setFaq(res.data));
  }, []);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="section-main2">
    <section className="faq-section">
      {/* LEFT SIDE IMAGES */}
      <div className="faq-left">
        <img
          src="https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/faq/faq-1.webp"
          className="img-main"
          alt="faq"
        />
        <img
          src="https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/faq/faq-2.webp"
          className="img-overlay"
          alt="faq"
        />
        <img
          src="/src/assets/Images/faq-shape.webp"
          className="img-rotate"
          alt="rotate"
        />
      </div>

      {/* RIGHT SIDE CONTENT */}
      <div className="faq-right">
        <span className="faq-tag">FAQ</span>
        <h2>Need To Ask Some Questions Or Check Questions</h2>

        {faq.map((item, index) => (
          <FaqItem
            key={item.id}
            data={item}
            isOpen={activeIndex === index}
            onClick={() => handleToggle(index)}
          />
        ))}
      </div>
    </section>
    </section>
  );
};

export default Faq;
