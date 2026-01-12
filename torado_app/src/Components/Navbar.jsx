import React, { useEffect, useRef, useState } from "react";

import { FaBars, FaChevronDown } from "react-icons/fa";
import { IoIosGitCompare } from "react-icons/io";
import { CiHeart, CiUser } from "react-icons/ci";
import { PiShoppingCartThin } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useWishlist } from "./useWishlist";
import { useCart } from "./CartContext";
import { FiLogOut } from "react-icons/fi";
import Login from "../Pages/Login";

const Navbar = () => {
  const navbarRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const userMenuRef = useRef(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [user, setUser] = useState(null);
  const [navTop, setNavTop] = useState(null);
  const { wishlist } = useWishlist();
  const { cart } = useCart();

  useEffect(() => {
    if (navbarRef.current && navTop === null) {
      setNavTop(navbarRef.current.getBoundingClientRect().top + window.scrollY);
    }

    const onScroll = () => {
      if (navTop !== null && window.scrollY > navTop) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [navTop]);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const cartCount = cart.reduce((total, item) => total + item.qty, 0);
  const getAvatarColor = (name) => {
    const colors = [
      "#ff6b6b",
      "#6c5ce7",
      "#00b894",
      "#0984e3",
      "#e17055",
      "#fdcb6e",
      "#00cec9",
      "#d63031",
    ];

    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <>
      <nav
        ref={navbarRef}
        className={`td-navbar ${isSticky ? "td-navbar--fixed" : ""}`}
      >
        {/* ALL DEPARTMENTS */}
        <div className="td-departments td-dept-dropdown">
          <div className="td-dept-left">
            <FaBars />
            <span className="departs p-0">All Departments</span>
          </div>

          <FaChevronDown className="td-rotate-icon td-dept-arrow" />

          <ul className="td-dept-menu">
            <li>Measuring Tools</li>
            <li>Roofing Tools</li>
            <li>Cordless Tools</li>
            <li>Welding &amp; Soldering</li>
            <li>Gardening Tools</li>
            <li>Air and Gas Powered Tools</li>
            <li>Safety Tools</li>
            <li>Site Lighting Tools</li>
            <li>Tools Accessories</li>
            <li>Air and Gas Powered Tools</li>
          </ul>
        </div>

        {/* MAIN MENU */}
        <ul className="td-menu m-0 p-0">
          <li className="td-dropdown">
            <Link to="/">
              Home <FaChevronDown className="td-rotate-icon" />
            </Link>
            <ul className="td-dropdown-menu">
              <li>Home One</li>
              <li>Home Two</li>
              <li>Home Three</li>
            </ul>
          </li>

          <li className="td-menu-item">
            {" "}
            <Link to="/aboutus">About</Link>
          </li>

          <li className="td-dropdown">
            Pages <FaChevronDown className="td-rotate-icon" />
            <ul className="td-dropdown-menu">
              <li>
                <Link to="/store-location">Store Locations</Link>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
              <li>
                <Link to="/terms">Terms of Service</Link>
              </li>
              <li>
                <Link to="/privacy">Privacy & Policy</Link>
              </li>
              <li>
                <Link to="/error">404 Error Page</Link>
              </li>
            </ul>
          </li>

          <li className="td-dropdown">
            Shop <FaChevronDown className="td-rotate-icon" />
            <ul className="td-dropdown-menu td-shop-menu">
              <li className="td-has-submenu">
                Shop Layout
                <ul className="td-submenu">
                  <li>
                    <Link to="/shop-grid">Shop Grid</Link>
                  </li>
                  <li>
                    <Link to="/shop-sidebar1">Shop Left sidebar</Link>
                  </li>
                  <li>
                    <Link to="/shop-sidebar2">Shop Right sidebar</Link>
                  </li>
                  <li>Right Sidebar</li>
                </ul>
              </li>
              <li>Shop Details</li>
              <li>
                <Link to="/cart">Cart</Link>{" "}
              </li>
              <li>Wishlist</li>
              <li>Compare Products</li>
              <li>
                <Link to="/checkout">Checkout</Link>
              </li>
              <li>
                <Link to="/orders">Track Orders</Link>
              </li>
              <li>My Account</li>
            </ul>
          </li>

          <li className="td-dropdown">
            Blog <FaChevronDown className="td-rotate-icon" />
            <ul className="td-dropdown-menu">
              <li className="td-has-submenu">
                Blog Layout
                <ul className="td-submenu">
                  <li>
                    <Link to="/blog-standard">Blog Standard</Link>
                  </li>
                  <li>
                    <Link to="/blog-leftsidebar">Blog Left Sidebar</Link>
                  </li>
                  <li>
                    <Link to="/blog-rightsidebar">Blog Right Sidebar</Link>
                  </li>
                </ul>
              </li>
              <li className="td-has-submenu">
                Single Blogs
                <ul className="td-submenu">
                  <li>
                    <Link to="/blogdetail">Blog Details No Sidebar</Link>
                  </li>
                  <li>Blog Details Left Sidebar</li>
                  <li>Blog Details Right Sidebar</li>
                </ul>
              </li>
            </ul>
          </li>

          <li className="td-menu-item">
            <Link to="/contact">Contact Us</Link>
          </li>
        </ul>

        {/* RIGHT ICONS */}
        <div className="td-nav-icons">
          <span>
            <IoIosGitCompare className="nav-icons" /> Compare
          </span>
          <Link to="/wishlist" className="wishlist-link">
            <span className="wishlist-wrapper">
              <CiHeart className="nav-icons" />
              <span className="wishlist-text">Wishlist</span>

              {wishlist.length > 0 && (
                <span className="wishlist-count">{wishlist.length}</span>
              )}
            </span>
          </Link>

          <Link to="/cart" className="wishlist-link">
            <span className="wishlist-wrapper">
              <PiShoppingCartThin className="nav-icons" />
              <span className="wishlist-text">Cart</span>

              {cartCount > 0 && (
                <span className="wishlist-count">{cartCount}</span>
              )}
            </span>
          </Link>

          <div className="nav-right">
            {!user ? (
              <span className="account-link" onClick={() => setShowLogin(true)}>
                <CiUser className="nav-icons" />
                Account
              </span>
            ) : (
              <div className="user-dropdown" ref={userMenuRef}>
                <div
                  className="user-trigger"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  {/* Avatar */}
                  <div
                    className="user-avatar"
                    style={{ backgroundColor: getAvatarColor(user.name) }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </div>

                  <span
                    className="user-name"
                    style={{ color: getAvatarColor(user.name) }}
                  >
                    {user.name}
                  </span>
                </div>

                {showUserMenu && (
                  <div className="user-menu">
                    <span className="menu-item4">Profile</span>

                    <span className="menu-item4 logout" onClick={logout}>
                      <FiLogOut className="logout-icon" />
                      Logout
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onSuccess={(userData) => {
            setUser(userData);
            setShowLogin(false);
          }}
        />
      )}
    </>
  );
};

export default Navbar;
