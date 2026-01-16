import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  HiOutlinePlusCircle,
  HiOutlineEye,
  HiOutlineTrash,
} from "react-icons/hi2";

const API = "http://localhost:8000/api/blog_Tag";

const BlogTags = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);

  const [viewTag, setViewTag] = useState(null);
  const [addTag, setAddTag] = useState(false);
  const [tagName, setTagName] = useState("");

  const token = localStorage.getItem("token");

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchTags = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/`, authHeader);
      setTags(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
    // eslint-disable-next-line
  }, []);

  const handleAdd = async () => {
    if (!tagName.trim()) return alert("Tag name required");
    await axios.post(`${API}/create`, { name: tagName }, authHeader);
    setAddTag(false);
    setTagName("");
    fetchTags();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this tag?")) return;
    await axios.delete(`${API}/delete/${id}`, authHeader);
    fetchTags();
  };

  return (
    <>
      <div className="usrm-wrapper">
        <div className="usrm-header">
          <h2 className="usrm-title">Blog Tags</h2>
          <button className="usrm-add-btn" onClick={() => setAddTag(true)}>
            <HiOutlinePlusCircle /> Add Tag
          </button>
        </div>

        <div className="usrm-table-card">
          {loading ? (
            <p className="usrm-loading">Loading tags...</p>
          ) : (
            <table className="usrm-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Tag Name</th>
                  <th>Created At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tags.map((tag, index) => (
                  <tr key={tag.id} className="usrm-row">
                    <td>{index + 1}</td>
                    <td>
                      <span className="tag-chip">{tag.name}</span>
                    </td>
                    <td>{new Date(tag.created_at).toLocaleDateString()}</td>
                    <td className="usrm-actions">
                      <HiOutlineEye onClick={() => setViewTag(tag)} />
                      <HiOutlineTrash onClick={() => handleDelete(tag.id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* VIEW MODAL */}
        {viewTag && (
          <div className="usrm-modal-overlay">
            <div className="usrm-modal usrm-animate">
              <h3>Tag Details</h3>
              <p>
                <b>ID:</b> {viewTag.id}
              </p>
              <p>
                <b>Name:</b> <span className="tag-chip">{viewTag.name}</span>
              </p>
              <button
                className="usrm-modal-close"
                onClick={() => setViewTag(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* ADD MODAL */}
        {addTag && (
          <div className="usrm-modal-overlay">
            <div className="usrm-modal usrm-animate">
              <h3>Add Blog Tag</h3>

              <input
                type="text"
                placeholder="Enter tag name"
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
              />

              <div className="usrm-modal-actions">
                <button className="usrm-btn-primary" onClick={handleAdd}>
                  Save
                </button>
                <button
                  className="usrm-btn-danger"
                  onClick={() => setAddTag(false)}
                >
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

export default BlogTags;
