import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  HiOutlineEye,
  HiOutlineTrash,
  HiOutlinePlusCircle,
  HiOutlinePencilSquare,
} from "react-icons/hi2";

const API = "http://localhost:8000/api/blogs";

const MainBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const [viewBlog, setViewBlog] = useState(null);
  const [editBlog, setEditBlog] = useState(null);
  const [addBlog, setAddBlog] = useState(false);

  const [apiTags, setApiTags] = useState([]);
  const [blogTagsMap, setBlogTagsMap] = useState({});

  const token = localStorage.getItem("token");
  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API, authHeader);
      const blogList = res.data.blogs || res.data || [];
      setBlogs(blogList);

      const tagsMap = {};
      await Promise.all(
        blogList.map(async (b) => {
          try {
            const detail = await axios.get(`${API}/${b.id}`, authHeader);
            tagsMap[b.id] = detail.data.tags || [];
          } catch {
            tagsMap[b.id] = [];
          }
        })
      );
      setBlogTagsMap(tagsMap);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
    // eslint-disable-next-line
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog?")) return;
    await axios.delete(`${API}/delete/${id}`, authHeader);
    fetchBlogs();
  };

  const handleAdd = async () => {
    await axios.post(`${API}/create`, addBlog, authHeader);
    setAddBlog(false);
    fetchBlogs();
  };

  const handleUpdate = async () => {
    await axios.put(`${API}/update/${editBlog.id}`, editBlog, authHeader);
    setEditBlog(null);
    fetchBlogs();
  };

  const resolvedTags = viewBlog?.tags || viewBlog?.blog?.tags || apiTags || [];

  return (
    <>
      <div className="blg-wrapper">
        <div className="blg-header">
          <h2>Blog Management</h2>
          <button className="blg-add-btn" onClick={() => setAddBlog({})}>
            <HiOutlinePlusCircle /> Add Blog
          </button>
        </div>

        <div className="blg-table-card">
          {loading ? (
            <p className="blg-loading">Loading blogs...</p>
          ) : (
            <table className="blg-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Tags</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog, index) => (
                  <tr key={blog.id}>
                    <td>{index + 1}</td>
                    <td>
                      <img src={blog.main_image} alt="" className="blg-thumb" />
                    </td>
                    <td>{blog.title}</td>
                    <td>{blog.heading}</td>

                    <td>
                      <div className="blg-tags">
                        {blogTagsMap[blog.id]?.length > 0 ? (
                          blogTagsMap[blog.id].map((t) => (
                            <span key={t.id} className="blg-tag">
                              {t.name}
                            </span>
                          ))
                        ) : (
                          <span className="blg-no-tag">No Tags</span>
                        )}
                      </div>
                    </td>

                    <td className="blg-actions">
                      <HiOutlineEye
                        onClick={async () => {
                          const res = await axios.get(
                            `${API}/${blog.id}`,
                            authHeader
                          );
                          setViewBlog(res.data.blog);
                          setApiTags(res.data.tags || []);
                        }}
                      />
                      <HiOutlinePencilSquare
                        onClick={() => setEditBlog(blog)}
                      />
                      <HiOutlineTrash onClick={() => handleDelete(blog.id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* VIEW MODAL */}
        {viewBlog && (
          <div className="blg-modal-overlay">
            <div className="blg-modal">
              <img src={viewBlog.main_image} alt="" />
              <h3>{viewBlog.title}</h3>
              <p>
                <b>Heading:</b> {viewBlog.heading}
              </p>
              <p>
                <b>Quote:</b> {viewBlog.quote}
              </p>
              <p>
                <b>Tags:</b>{" "}
                {resolvedTags.length > 0
                  ? resolvedTags.map((t) => t.name).join(", ")
                  : "No Tags"}
              </p>
              <button
                onClick={() => setViewBlog(null)}
                className="usrm-btn-danger"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* ADD MODAL */}
        {addBlog && (
          <div className="blg-modal-overlay">
            <div className="blg-modal">
              <h3>Add Blog</h3>

              <input
                placeholder="Title"
                onChange={(e) =>
                  setAddBlog({ ...addBlog, title: e.target.value })
                }
              />

              <input
                placeholder="Heading"
                onChange={(e) =>
                  setAddBlog({ ...addBlog, heading: e.target.value })
                }
              />

              <input
                placeholder="Image URL"
                onChange={(e) =>
                  setAddBlog({ ...addBlog, main_image: e.target.value })
                }
              />

              <textarea
                placeholder="Quote"
                onChange={(e) =>
                  setAddBlog({ ...addBlog, quote: e.target.value })
                }
              />

              <div className="blg-modal-actions">
                <button className="primary" onClick={handleAdd}>
                  Save
                </button>
                <button className="danger" onClick={() => setAddBlog(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* UPDATE MODAL */}
        {editBlog && (
          <div className="blg-modal-overlay">
            <div className="blg-modal">
              <h3>Update Blog</h3>

              <input
                value={editBlog.title}
                onChange={(e) =>
                  setEditBlog({ ...editBlog, title: e.target.value })
                }
              />

              <input
                value={editBlog.heading}
                onChange={(e) =>
                  setEditBlog({ ...editBlog, heading: e.target.value })
                }
              />

              <textarea
                value={editBlog.quote}
                onChange={(e) =>
                  setEditBlog({ ...editBlog, quote: e.target.value })
                }
              />

              <div className="blg-modal-actions">
                <button className="primary" onClick={handleUpdate}>
                  Update
                </button>
                <button className="danger" onClick={() => setEditBlog(null)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MainBlog;
