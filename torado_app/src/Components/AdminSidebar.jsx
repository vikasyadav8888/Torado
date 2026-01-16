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
  FaBlog,
  FaListAlt,
  FaSitemap,
  FaHashtag,
  FaProjectDiagram,
  FaParagraph,
  FaFire,
  FaShoppingBag,
  FaComments,
  FaReceipt,          // ✅ NEW ICON FOR ORDERS
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const [productOpen, setProductOpen] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false); 

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

        {/* ---------------- Products ---------------- */}
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

        {/* ---------------- BLOG SECTION ---------------- */}
        <li
          className={activeTab === "blogs" ? "active" : ""}
          onClick={() => setBlogOpen(!blogOpen)}
        >
          <FaBlog /> Blogs
          <FaChevronDown className={`prd-arrow ${blogOpen ? "open" : ""}`} />
        </li>

        {blogOpen && (
          <ul className="prd-dropdown">
            <li
              className={activeTab === "main-blogs" ? "active" : ""}
              onClick={() => setActiveTab("main-blogs")}
            >
              <FaListAlt /> Main Blogs
            </li>

            <li
              className={activeTab === "blog-category" ? "active" : ""}
              onClick={() => setActiveTab("blog-category")}
            >
              <FaTags /> Blog Category
            </li>

            <li
              className={activeTab === "category-map" ? "active" : ""}
              onClick={() => setActiveTab("category-map")}
            >
              <FaSitemap /> Category Map
            </li>

            <li
              className={activeTab === "blog-tags" ? "active" : ""}
              onClick={() => setActiveTab("blog-tags")}
            >
              <FaHashtag /> Blog Tags
            </li>

            <li
              className={activeTab === "tag-map" ? "active" : ""}
              onClick={() => setActiveTab("tag-map")}
            >
              <FaProjectDiagram /> Tag Maps
            </li>

            <li
              className={activeTab === "blog-paragraph" ? "active" : ""}
              onClick={() => setActiveTab("blog-paragraph")}
            >
              <FaParagraph /> Blog Paragraph
            </li>

            <li
              className={activeTab === "pre-sale-blogs" ? "active" : ""}
              onClick={() => setActiveTab("pre-sale-blogs")}
            >
              <FaFire /> Pre-Sale Blogs
            </li>

            <li
              className={activeTab === "after-sale-blogs" ? "active" : ""}
              onClick={() => setActiveTab("after-sale-blogs")}
            >
              <FaShoppingBag /> After-Sale Blogs
            </li>

            <li
              className={activeTab === "blog-comments" ? "active" : ""}
              onClick={() => setActiveTab("blog-comments")}
            >
              <FaComments /> Blog Comments
            </li>
          </ul>
        )}

        {/* ---------------- OTHER TABS ---------------- */}
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

        {/* ---------------- ORDERS (NEW TAB) ---------------- */}
        <li
          className={activeTab === "orders" ? "active" : ""}
          onClick={() => setActiveTab("orders")}
        >
          <FaReceipt /> Orders
        </li>
      </ul>

      <div className="sidebar-logout" onClick={handleLogout}>
        <FaSignOutAlt /> Logout
      </div>
    </aside>
  );
};

export default AdminSidebar;
