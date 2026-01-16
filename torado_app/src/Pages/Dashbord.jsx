import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaBlog,
  FaBoxOpen,
  FaUsers,
  FaEnvelope,
  FaStar,
  FaQuestionCircle,
  FaUsersCog,
  FaMapMarkerAlt,
} from "react-icons/fa";

const getCount = (res) => {
  if (!res || !res.data) return 0;

  // case 1: { success, total, data: [] }
  if (typeof res.data.total === "number") return res.data.total;

  // case 2: direct array []
  if (Array.isArray(res.data)) return res.data.length;

  // case 3: { data: [] }
  if (Array.isArray(res.data.data)) return res.data.data.length;

  return 0;
};

const Dashboard = () => {
  const [stats, setStats] = useState({
    blogs: 0,
    products: 0,
    users: 0,
    contacts: 0,
    reviews: 0,
    faqs: 0,
    team: 0,
    stores: 0,
  });

  useEffect(() => {

    fetchDashboardCounts();
    
  }, []);

  const fetchDashboardCounts = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token missing");
        return;
      }

      const api = axios.create({
        baseURL: "http://localhost:8000/api",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const [
        blogs,
        products,
        users,
        contacts,
        reviews,
        faqs,
        team,
        stores,
      ] = await Promise.all([
        api.get("/blogs/"),
        api.get("/product/"),
        api.get("/users/"),
        api.get("/contact_form/"),
        api.get("/review/"),
        api.get("/faqs/"),
        api.get("/team/"),
        api.get("/store_location/"),
      ]);

      setStats({
        blogs: getCount(blogs),
        products: getCount(products),
        users: getCount(users),
        contacts: getCount(contacts),
        reviews: getCount(reviews),
        faqs: getCount(faqs),
        team: getCount(team),
        stores: getCount(stores),
      });
    } catch (error) {
      console.error("Dashboard API error:", error.response || error);
    }
  };

  return (
    <div className="dashboard-wrapper">
      <h2 className="dashboard-heading">Admin Dashboard</h2>

      <div className="dashboard-grid">
        <Card icon={<FaBlog />} title="Blogs" value={stats.blogs} color="blue" />
        <Card icon={<FaBoxOpen />} title="Products" value={stats.products} color="green" />
        <Card icon={<FaUsers />} title="Users" value={stats.users} color="purple" />
        <Card icon={<FaEnvelope />} title="Contacts" value={stats.contacts} color="orange" />
        <Card icon={<FaStar />} title="Reviews" value={stats.reviews} color="red" />
        <Card icon={<FaQuestionCircle />} title="FAQs" value={stats.faqs} color="cyan" />
        <Card icon={<FaUsersCog />} title="Team Members" value={stats.team} color="teal" />
        <Card icon={<FaMapMarkerAlt />} title="Store Locations" value={stats.stores} color="pink" />
      </div>
    </div>
  );
};

const Card = ({ icon, title, value, color }) => (
  <div className={`dashboard-card ${color}`}>
    <div className="dashboard-icon">{icon}</div>
    <div>
      <p>{title}</p>
      <h3>{value}</h3>
    </div>
  </div>
);

export default Dashboard;
