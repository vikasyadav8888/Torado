import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import ContactForm from "../Components/ContactForm";

const iconMap = {
  location: <FaMapMarkerAlt />,
  email: <FaEnvelope />,
  phone: <FaPhoneAlt />,
};
const Contact = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/contact_info/")
      .then((res) => {
        setCards(res.data.data);
      })
      .catch((err) => {
        console.error("API Error:", err);
      });
  }, []);

  return (
    <>
      <section className="section-main2">
        <div className="row">
          <div className="col-4">
            <section className="contact-section">
              <div className="contact-container">
                {cards.map((item) => (
                  <div className="contact-card" key={item.id}>
                    <div className="contact-icon">{iconMap[item.type]}</div>

                    <div className="contact-content">
                      <h3>{item.title}</h3>
                      <p>{item.value_1}</p>
                      {item.value_2 && <p>{item.value_2}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
          <div className="col-8">
            <section className="map-section">
              <div className="map-wrapper">
                <iframe
                  title="Google Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8491617826644!2d144.94426347524552!3d-37.817001934222105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d452b97c1ef%3A0xf0456760532d9f0!2sMarvel%20Stadium!5e0!3m2!1sen!2sin!4v1766658247996!5m2!1sen!2sin"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </section>
          </div>
        </div>
        <ContactForm/>
      </section>
    </>
  );
};

export default Contact;
