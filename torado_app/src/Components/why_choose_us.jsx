import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaShippingFast, FaUndo, FaWallet, FaHeadset } from "react-icons/fa";

const icons = {
  shipping: <FaShippingFast />,
  return: <FaUndo />,
  money: <FaWallet />,
  support: <FaHeadset />,
};

const WhyChooseUs = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/why_choose_us/")
      .then((res) => {
        setCards(res.data.data); // ✅ FIX
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="wcu-wrapper">
        <section className="section-main2">
          <h2>Why Choose Us</h2>

          <div className="wcu-grid">
            {cards.map((item) => (
              <div className="wcu-card" key={item.id}>
                <div className="wcu-icon">{icons[item.icon]}</div>
                <h4>{item.title}</h4>
                <p>{item.subtitle}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default WhyChooseUs;
