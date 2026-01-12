import React, { useState, useRef, useEffect } from "react";
import { FiPhoneCall, FiMail, FiGlobe, FiChevronDown } from "react-icons/fi";

const Header1 = () => {
  const [langOpen, setLangOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);

  const langRef = useRef(null);
  const currencyRef = useRef(null);

  // outside click close
  useEffect(() => {
    const handleClick = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
      if (
        currencyRef.current &&
        !currencyRef.current.contains(e.target)
      ) {
        setCurrencyOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <>
    <div className="tib-wrapper">
      <div className="tib-container">
        <div className="tib-left">
          <span className="tib-item">
            <FiPhoneCall className="tib-icon" />
            +11 222 3333
          </span>

          <span className="tib-divider">|</span>

          <span className="tib-item">
            <FiMail className="tib-icon" />
            hello@torado.com
          </span>
        </div>

        <div className="tib-center">
          Save up to <strong>50% off</strong> on your first order
        </div>

        <div className="tib-right">
          {/* Language Dropdown */}
          <div className="tib-dropdown" ref={langRef}>
            <span
              className="tib-item tib-dropdown-btn"
              onClick={() => setLangOpen(!langOpen)}
            >
              <FiGlobe className="tib-icon" />
              English
              <FiChevronDown />
            </span>

            {langOpen && (
              <ul className="tib-dropdown-menu">
                <li>English</li>
                <li>Hindi</li>
                <li>French</li>
              </ul>
            )}
          </div>

          <span className="tib-divider">|</span>

          {/* Currency Dropdown */}
          <div className="tib-dropdown" ref={currencyRef}>
            <span
              className="tib-item tib-dropdown-btn"
              onClick={() => setCurrencyOpen(!currencyOpen)}
            >
              USD <FiChevronDown />
            </span>

            {currencyOpen && (
              <ul className="tib-dropdown-menu">
                <li>USD</li>
                <li>INR</li>
                <li>EUR</li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Header1;

