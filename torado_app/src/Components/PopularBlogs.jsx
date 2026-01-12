import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiSearch } from "react-icons/fi";


const PopularBlogs = ({ onCategorySelect, onTagSelect }) => {
  const [popularPosts, setPopularPosts] = useState([]);
  const [search, setSearch] = useState("");

  // Static categories (ID backend se mapped)
  const categories = [
    { id: 1, name: "Machine Tools" },
    { id: 2, name: "Hand Tools" },
    { id: 3, name: "Abrasive" },
    { id: 4, name: "Power Tools" },
    { id: 5, name: "Measuring Tools" },
  ];

  // Static tags
  const tags = [
    "Power Tools",
    "Hand Tools",
    "Safety",
    "Cordless",
    "Gardening",
    "Machine",
  ];

  useEffect(() => {
    const fetchPopularPosts = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/blogs/");
        const blogs = res.data.data || res.data;

        // ✅ First 3 blogs
        setPopularPosts(blogs.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch popular posts", error);
      }
    };

    fetchPopularPosts();
  }, []);

  return (
    <aside className="blog-sidebar">
      
      <div className="sidebar-card">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button>
            <FiSearch />
          </button>
        </div>
      </div>

      {/* ================= Categories ================= */}
      <div className="sidebar-card">
        <h3 className="sidebar-title">Categories</h3>
        <span className="sidebar-line"></span>

        <ul className="category-list">
          {categories.map((cat) => (
            <li key={cat.id} onClick={() => onCategorySelect(cat.id)}>
              <span className="dot"></span>
              {cat.name}
            </li>
          ))}
        </ul>
      </div>

      {/* ================= Popular Posts ================= */}
      <div className="sidebar-card">
        <h3 className="sidebar-title">Popular Posts</h3>
        <span className="sidebar-line"></span>

        <div className="popular-posts">
          {popularPosts.map((post) => {
            const dateObj = new Date(post.blog_date);

            return (
              <div className="popular-post" key={post.id}>
                <img src={post.main_image} alt={post.title} />
                <div className="post-info">
                  <span>
                    {dateObj.toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <h4>{post.title}</h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= Popular Tags ================= */}
      <div className="sidebar-card">
        <h3 className="sidebar-title">Popular Tags</h3>
        <span className="sidebar-line"></span>

        <div className="tag-list">
          {tags.map((tag) => (
            <span key={tag} onClick={() => onTagSelect(tag)}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default PopularBlogs;
