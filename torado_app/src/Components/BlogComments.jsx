import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  HiOutlineEye,
  HiOutlineTrash,
  HiOutlinePlusCircle,
  HiOutlinePencilSquare,
} from "react-icons/hi2";

const API = "http://localhost:8000/api/blogcomment";

const BlogComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const [viewItem, setViewItem] = useState(null);
  const [addItem, setAddItem] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const token = localStorage.getItem("token");
  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchComments = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/`, authHeader);
      setComments(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line
  }, []);

  const handleAdd = async () => {
    await axios.post(`${API}/create`, addItem, authHeader);
    setAddItem(false);
    fetchComments();
  };

  const handleUpdate = async () => {
    await axios.put(`${API}/update/${editItem.id}`, editItem, authHeader);
    setEditItem(null);
    fetchComments();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this comment?")) return;
    await axios.delete(`${API}/delete/${id}`, authHeader);
    fetchComments();
  };

  return (
    <>
      <div className="usrm-wrapper">
        <div className="usrm-header">
          <h2 className="usrm-title">Blog Comments</h2>
          <button
            className="usrm-add-btn"
            onClick={() => setAddItem({ save_info: 1, status: 1 })}
          >
            <HiOutlinePlusCircle /> Add Comment
          </button>
        </div>

        <div className="usrm-table-card">
          {loading ? (
            <p className="usrm-loading">Loading comments...</p>
          ) : (
            <table className="usrm-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Blog</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Comment</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {comments.map((c, index) => (
                  <tr key={c.id}>
                    <td>{index + 1}</td>
                    <td>
                      <span className="bc-chip">Blog #{c.blog_id}</span>
                    </td>
                    <td>{c.name}</td>
                    <td>{c.email}</td>
                    <td className="bc-comment">
                      {c.comment.length > 40
                        ? c.comment.slice(0, 40) + "..."
                        : c.comment}
                    </td>
                    <td className="usrm-actions">
                      <HiOutlineEye onClick={() => setViewItem(c)} />
                      <HiOutlinePencilSquare onClick={() => setEditItem(c)} />
                      <HiOutlineTrash onClick={() => handleDelete(c.id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* VIEW MODAL */}
        {viewItem && (
          <div className="usrm-modal-overlay">
            <div className="usrm-modal usrm-animate bc-modal">
              <h3>Comment Details</h3>
              <p>
                <b>Blog ID:</b> {viewItem.blog_id}
              </p>
              <p>
                <b>Name:</b> {viewItem.name}
              </p>
              <p>
                <b>Email:</b> {viewItem.email}
              </p>
              <p className="bc-full-comment">{viewItem.comment}</p>

              <button
                className="usrm-modal-close"
                onClick={() => setViewItem(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* ADD MODAL */}
        {addItem && (
          <div className="usrm-modal-overlay">
            <div className="usrm-modal usrm-animate bc-modal">
              <h3>Add Comment</h3>

              <input
                placeholder="Blog ID"
                type="number"
                onChange={(e) =>
                  setAddItem({ ...addItem, blog_id: e.target.value })
                }
              />

              <input
                placeholder="Name"
                onChange={(e) =>
                  setAddItem({ ...addItem, name: e.target.value })
                }
              />

              <input
                placeholder="Email"
                onChange={(e) =>
                  setAddItem({ ...addItem, email: e.target.value })
                }
              />

              <textarea
                rows="4"
                placeholder="Comment"
                onChange={(e) =>
                  setAddItem({ ...addItem, comment: e.target.value })
                }
              />

              <div className="usrm-modal-actions">
                <button className="usrm-btn-primary" onClick={handleAdd}>
                  Save
                </button>
                <button
                  className="usrm-btn-danger"
                  onClick={() => setAddItem(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* UPDATE MODAL */}
        {editItem && (
          <div className="usrm-modal-overlay">
            <div className="usrm-modal usrm-animate bc-modal">
              <h3>Update Comment</h3>

              <input
                value={editItem.name}
                onChange={(e) =>
                  setEditItem({ ...editItem, name: e.target.value })
                }
              />

              <input
                value={editItem.email}
                onChange={(e) =>
                  setEditItem({ ...editItem, email: e.target.value })
                }
              />

              <textarea
                rows="4"
                value={editItem.comment}
                onChange={(e) =>
                  setEditItem({ ...editItem, comment: e.target.value })
                }
              />

              <div className="usrm-modal-actions">
                <button className="usrm-btn-primary" onClick={handleUpdate}>
                  Update
                </button>
                <button
                  className="usrm-btn-danger"
                  onClick={() => setEditItem(null)}
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

export default BlogComments;
