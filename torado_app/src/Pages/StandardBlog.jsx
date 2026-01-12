import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FiUser,
  FiMessageCircle,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const StandardBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/blogs/");
        const blogList = response.data.data || response.data;

        const blogsWithComments = await Promise.all(
          blogList.map(async (blog) => {
            try {
              const detailRes = await axios.get(
                `http://localhost:8000/api/blogs/${blog.id}`
              );
              return {
                ...blog,
                comment_count: detailRes.data.comments?.length || 0,
              };
            } catch {
              return { ...blog, comment_count: 0 };
            }
          })
        );

        setBlogs(blogsWithComments);
      } catch (err) {
        console.error(err)
        setError("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <p className="blog-loading">Loading blogs...</p>;
  if (error) return <p className="blog-error">{error}</p>;

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  return (
    <>
      {/* HERO */}
      <section className="about-hero">
        <div className="about-hero-overlay"></div>
        <div className="about-hero-content">
          <h1>Blog</h1>
          <p>
            Home <span>/</span> <span className="active">Blog</span>
          </p>
        </div>
      </section>

      {/* BLOG LIST */}
      <section className="section-main2">
        <section className="blog-section">
          <div className="blog-container">
            {currentBlogs.map((blog) => {
              const dateObj = new Date(blog.blog_date);

              return (
                <article className="blog-card" key={blog.id}>
                  <div className="blog-image-wrapper">
                    <img src={blog.main_image} alt={blog.title} />
                    <div className="blog-date">
                      <span>{dateObj.getDate()}</span>
                      <small>
                        {dateObj.toLocaleString("en-US", { month: "short" })}
                      </small>
                    </div>
                  </div>

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
                    <button className="blog-read-more">Read More</button>
                  </div>
                </article>
              );
            })}
          </div>

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
        </section>
      </section>
    </>
  );
};

export default StandardBlog;
