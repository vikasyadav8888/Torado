import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FiUser,
  FiMessageCircle,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const Blogwithgride = ({ selectedCategory }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 4;

  
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/blogs/");
        const blogList = response.data.data || response.data;

        const blogsWithDetails = await Promise.all(
          blogList.map(async (blog) => {
            try {
              const detailRes = await axios.get(
                `http://localhost:8000/api/blogs/${blog.id}`
              );

              return {
                ...blog,
                categories: detailRes.data.categories || [],
                comment_count: detailRes.data.comments?.length || 0,
              };
            } catch {
              return {
                ...blog,
                categories: [],
                comment_count: 0,
              };
            }
          })
        );

        setBlogs(blogsWithDetails);
      } catch (err) {
        console.error(err);
        setError("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  /* ================= CATEGORY FILTER ================= */
  const filteredBlogs = selectedCategory
    ? blogs.filter((blog) =>
        blog.categories.some(
          (cat) => cat.id === selectedCategory
        )
      )
    : blogs;

  /* ================= PAGINATION ================= */
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(
    indexOfFirstBlog,
    indexOfLastBlog
  );

  const totalPages = Math.ceil(
    filteredBlogs.length / blogsPerPage
  );

  /* Reset page when category changes */
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  if (loading) return <p className="blog-loading">Loading blogs...</p>;
  if (error) return <p className="blog-error">{error}</p>;

  return (
    <section className="blog-section">
      <div className="blog-container2">
        {currentBlogs.length === 0 ? (
          <p>No blogs found</p>
        ) : (
          currentBlogs.map((blog) => {
            const dateObj = new Date(blog.blog_date);

            return (
              <article className="blog-card" key={blog.id}>
                {/* IMAGE */}
                <div className="blog-image-wrapper">
                  <img src={blog.main_image} alt={blog.title} />
                  <div className="blog-date">
                    <span>{dateObj.getDate()}</span>
                    <small>
                      {dateObj.toLocaleString("en-US", {
                        month: "short",
                      })}
                    </small>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="blog-content">
                  <div className="blog-meta">
                    <span>
                      <FiUser /> {blog.heading}
                    </span>
                    <span>
                      <FiMessageCircle /> {blog.comment_count} Comment
                    </span>
                  </div>

                  <h3 className="blog-title">{blog.title}</h3>
                  <button className="blog-read-more">
                    Read More
                  </button>
                </div>
              </article>
            );
          })
        )}
      </div>

      {/* ================= PAGINATION ================= */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="page-arrow"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            <FiChevronLeft />
          </button>

          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                className={`page-number ${
                  currentPage === page ? "active" : ""
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            );
          })}

          <button
            className="page-arrow"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            <FiChevronRight />
          </button>
        </div>
      )}
    </section>
  );
};

export default Blogwithgride;
