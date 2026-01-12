import React from "react";

const FaqItem = ({ data, isOpen, onClick }) => {
  return (
    <div className={`faq-item ${isOpen ? "open" : ""}`}>
      <div className="faq-question" onClick={onClick}>
        <span>{isOpen ? "−" : "+"}</span>
        <h4>{data.question}</h4>
      </div>

      <div className="faq-answer">
        <p>{data.answer}</p>
      </div>
    </div>
  );
};

export default FaqItem;
