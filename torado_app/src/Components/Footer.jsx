import React from "react";
import {
  FiMapPin,
  FiMail,
  FiPhone,
  FiSend,
  FiLayers,
  FiFileText,
  FiShoppingCart,
} from "react-icons/fi";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="footer-wrapper">
        <div className="footer-container">
          {/* Column 1 */}
          <div className="footer-col">
            <img
              src="/src/assets/Images/logo-white.webp"
              alt="Torado"
              className="footer-logo"
            />

            {/* Location */}
            <div className="footer-item">
              <FiMapPin />
              <div className="footer-item-content">
                <span className="footer-item-title">Location :</span>
                <p>2976/A, Sunrise road, Las Vegas, USA</p>
              </div>
            </div>

            {/* Email */}
            <div className="footer-item">
              <FiMail />
              <div className="footer-item-content">
                <span className="footer-item-title">Email :</span>
                <p>helo@torado.com</p>
              </div>
            </div>

            {/* Phone */}
            <div className="footer-item">
              <FiPhone />
              <div className="footer-item-content">
                <span className="footer-item-title">Phone :</span>
                <p>098765432150</p>
              </div>
            </div>
          </div>

          {/* Column 2 */}
          <div className="footer-col">
            <h4 className="footer-title">Useful Links</h4>
            <ul className="footer-links">
              <li>About</li>
              <li>Order Tracking</li>
              <li>Terms & Conditions</li>
              <li>Store Location</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="footer-col">
            <h4 className="footer-title">Information</h4>
            <ul className="footer-links">
              <li>Delivery Information</li>
              <li>Help Center</li>
              <li>Products</li>
              <li>Blog</li>
              <li>Contact</li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="footer-col">
            <h4 className="footer-title">Newsletter</h4>
            <p className="footer-text">
              Subscribe Our Newsletter To Get News
            </p>

            <div className="footer-newsletter">
              <input type="email" placeholder="Enter Your Email" />
              <button>
                <FiSend />
              </button>
            </div>

            <div className="footer-social">
              <span>Follow Us:</span>
              <FaFacebookF />
              <FaTwitter />
              <FaInstagram />
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <p className="torado">
            ©<span className="orange-text">Torado</span>  is proudly owned by <span className="orange-text">EnvyTheme</span>
          </p>

          <div className="footer-payments">
            <span className="payment">We accept payment via</span>
            <img src="/src/assets/Images/payment-1.webp" alt="Visa" />
            <img src="/src/assets/Images/payment-2.webp" alt="Mastercard" />
            <img src="/src/assets/Images/payment-3.webp" alt="Paypal" />
            <img src="/src/assets/Images/payment-4.webp" alt="Discover" />
          </div>
        </div>
      </footer>

      {/* Sticky Buttons */}
      <div className="footer-sticky">
        <button>
          <FiLayers /> Demos
        </button>
        <button>
          <FiFileText /> Docs
        </button>
        <button>
          <FiShoppingCart /> Buy Now
        </button>
      </div>
    </>
  );
};

export default Footer;
