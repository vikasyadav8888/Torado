import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FiUser, FiCalendar, FiCheck } from "react-icons/fi";
import PassCommentForm from "../Components/PassCommentForm";

const BlogDetail = () => {
    const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/blogs/3`
        );
        setData(res.data);
      } catch (err) {
        console.error("Blog detail fetch error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <p className="bd-loading">Loading...</p>;
  if (!data) return <p className="bd-error">No data found</p>;

  const { blog, paragraphs, pre_sale, after_sale } = data;

  return (
    <>
      <section className="section-main2">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8">
            <section className="bd-wrapper">
              {/* ================= MAIN IMAGE ================= */}
              <div className="bd-main-image">
                <img src={blog.main_image} alt={blog.title} />
              </div>

              {/* ================= META ================= */}
              <div className="bd-meta">
                <span>
                  <FiUser /> {blog.heading}
                </span>
                <span>
                  <FiCalendar />{" "}
                  {new Date(blog.blog_date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>

              {/* ================= TITLE ================= */}
              <h1 className="bd-title">{blog.title}</h1>

              {/* ================= PARAGRAPHS ================= */}
              <div className="bd-content">
                {paragraphs?.map((p) => (
                  <p key={p.id}>{p.content}</p>
                ))}
              </div>

              {/* ================= QUOTE ================= */}
              {blog.quote && (
                <div className="bd-quote-box">
                  <span className="bd-quote-icon">“</span>
                  <p>{blog.quote}</p>
                </div>
              )}

              {/* ================= PRE SALE ================= */}
              {pre_sale?.map((pre) => (
                <div className="bd-presale" key={pre.id}>
                  <h2 className="bd-section-title">{pre.title}</h2>

                  <ul className="bd-presale-list">
                    {pre.requirement.map((req, i) => (
                      <li key={i}>
                        <FiCheck /> {req}
                      </li>
                    ))}
                  </ul>

                  <div className="bd-presale-images">
                    <img src={pre.image1} alt="Pre Sale 1" />
                    <img src={pre.image2} alt="Pre Sale 2" />
                  </div>
                </div>
              ))}

              {/* ================= AFTER SALE ================= */}
              {after_sale?.map((after) => (
                <div className="bd-aftersale" key={after.id}>
                  <h2 className="bd-section-title">{after.title}</h2>

                  <p className="bd-aftersale-text">{after.short_paragraph_1}</p>

                  <ul className="bd-aftersale-list">
                    {after.checked_list.map((item, i) => (
                      <li key={i}>
                        <FiCheck className="cheked" /> {item}
                      </li>
                    ))}
                  </ul>

                  <p className="bd-aftersale-text">{after.paragraph_after_1}</p>
                </div>
              ))}
            </section>
            <PassCommentForm/>
          </div>
          <div className="col-2"></div>
        </div>
      </section>
    </>
  );
};

export default BlogDetail;
