import React, { useState } from "react";
import {
  FaHome,
  FaUsers,
  FaBox,
  FaQuestionCircle,
  FaMapMarkerAlt,
  FaUsersCog,
  FaSignOutAlt,
  FaChevronDown,
  FaRegCommentDots,
  FaTags,
  FaClipboardList,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const [productOpen, setProductOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/", { replace: true });
    window.location.reload();
  };

  return (
    <aside className="admin-sidebar">
      <ul className="sidebar-menu">
        <li
          className={activeTab === "dashboard" ? "active" : ""}
          onClick={() => setActiveTab("dashboard")}
        >
          <FaHome /> Dashboard
        </li>

        <li
          className={activeTab === "users" ? "active" : ""}
          onClick={() => setActiveTab("users")}
        >
          <FaUsers /> Users
        </li>

        <li
          className={activeTab === "products" ? "active" : ""}
          onClick={() => setProductOpen(!productOpen)}
        >
          <FaBox /> Products
          <FaChevronDown className={`prd-arrow ${productOpen ? "open" : ""}`} />
        </li>

        {productOpen && (
          <ul className="prd-dropdown">
            <li
              className={`prd-review ${
                activeTab === "product-review" ? "active" : ""
              }`}
              onClick={() => setActiveTab("product-review")}
            >
              <FaRegCommentDots /> Review
            </li>

            <li
              className={`prd-category ${
                activeTab === "product-category" ? "active" : ""
              }`}
              onClick={() => setActiveTab("product-category")}
            >
              <FaTags /> Category
            </li>

            <li
              className={`prd-category ${
                activeTab === "product-details" ? "active" : ""
              }`}
              onClick={() => setActiveTab("product-details")}
            >
              <FaClipboardList /> Details
            </li>
          </ul>
        )}

        <li
          className={activeTab === "faq" ? "active" : ""}
          onClick={() => setActiveTab("faq")}
        >
          <FaQuestionCircle /> FAQ
        </li>

        <li
          className={activeTab === "store-location" ? "active" : ""}
          onClick={() => setActiveTab("store-location")}
        >
          <FaMapMarkerAlt /> Store Location
        </li>

        <li
          className={activeTab === "our-team" ? "active" : ""}
          onClick={() => setActiveTab("our-team")}
        >
          <FaUsersCog /> Our Team
        </li>
      </ul>

      <div className="sidebar-logout" onClick={handleLogout}>
        <FaSignOutAlt /> Logout
      </div>
    </aside>
  );
};

export default AdminSidebar;
