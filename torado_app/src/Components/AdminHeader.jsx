import React from "react";
import { FaBars, FaUserCircle,FaSearch } from "react-icons/fa";


const AdminHeader = ({ toggleSidebar }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="admin-header">
      {/* Left */}
      <div className="header-left">
        <FaBars className="menu-icon" onClick={toggleSidebar} />
        <img
          src="/src/assets/Images/logo.webp"
          alt="Logo"
          className="header-logo"
        />
      </div>

      {/* Center */}
      <div className="header-center">
        <div className="header-search-box">
          <input
            type="text"
            placeholder="Search here..."
            className="header-search"
          />
          <FaSearch className="header-search-icon" />
        </div>
      </div>
      {/* Right */}
      <div className="header-right">
        <span className="user-status online"></span>

        <div className="admin-user-box">
          <FaUserCircle className="user-icon" />

          <div className="admin-user-info">
            <span className="admin-name">{user?.name || "Admin User"}</span>
            <span className="admin-role">Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
