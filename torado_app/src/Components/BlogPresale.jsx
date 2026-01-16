import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  HiOutlineEye,
  HiOutlineTrash,
  HiOutlinePlusCircle,
  HiOutlinePencilSquare,
} from "react-icons/hi2";

const API = "http://localhost:8000/api/blog_presale";

const BlogPreSale = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [viewItem, setViewItem] = useState(null);
  const [addItem, setAddItem] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const token = localStorage.getItem("token");
  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/`, authHeader);
      setList(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const handleAdd = async () => {
    await axios.post(`${API}/create`, addItem, authHeader);
    setAddItem(false);
    fetchData();
  };

  const handleUpdate = async () => {
    await axios.put(`${API}/update/${editItem.id}`, editItem, authHeader);
    setEditItem(null);
    fetchData();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this pre-sale item?")) return;
    await axios.delete(`${API}/delete/${id}`, authHeader);
    fetchData();
  };

  return (
    <>
      <div className="usrm-wrapper">
        <div className="usrm-header">
          <h2 className="usrm-title">Blog Pre-Sale</h2>
          <button
            className="usrm-add-btn"
            onClick={() => setAddItem({ requirement: [] })}
          >
            <HiOutlinePlusCircle /> Add Pre-Sale
          </button>
        </div>

        <div className="usrm-table-card">
          {loading ? (
            <p className="usrm-loading">Loading data...</p>
          ) : (
            <table className="usrm-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Blog ID</th>
                  <th>Title</th>
                  <th>Requirements</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>
                      <span className="bps-chip">Blog #{item.blog_id}</span>
                    </td>
                    <td>{item.title}</td>
                    <td>
                      <span className="bps-count">
                        {item.requirement?.length || 0} points
                      </span>
                    </td>
                    <td className="usrm-actions">
                      <HiOutlineEye onClick={() => setViewItem(item)} />
                      <HiOutlinePencilSquare
                        onClick={() => setEditItem(item)}
                      />
                      <HiOutlineTrash onClick={() => handleDelete(item.id)} />
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
            <div className="usrm-modal usrm-animate bps-modal">
              <h3>{viewItem.title}</h3>

              <p>
                <b>Blog ID:</b> {viewItem.blog_id}
              </p>

              <ul className="bps-list">
                {viewItem.requirement?.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>

              <div className="bps-images">
                {viewItem.image1 && <img src={viewItem.image1} alt="" />}
                {viewItem.image2 && <img src={viewItem.image2} alt="" />}
              </div>

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
            <div className="usrm-modal usrm-animate bps-modal">
              <h3>Add Pre-Sale</h3>

              <input
                placeholder="Blog ID"
                type="number"
                onChange={(e) =>
                  setAddItem({ ...addItem, blog_id: e.target.value })
                }
              />

              <input
                placeholder="Title"
                onChange={(e) =>
                  setAddItem({ ...addItem, title: e.target.value })
                }
              />

              <textarea
                placeholder="Requirements (one per line)"
                rows="5"
                onChange={(e) =>
                  setAddItem({
                    ...addItem,
                    requirement: e.target.value.split("\n"),
                  })
                }
              />

              <input
                placeholder="Image 1 URL"
                onChange={(e) =>
                  setAddItem({ ...addItem, image1: e.target.value })
                }
              />

              <input
                placeholder="Image 2 URL"
                onChange={(e) =>
                  setAddItem({ ...addItem, image2: e.target.value })
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
            <div className="usrm-modal usrm-animate bps-modal">
              <h3>Update Pre-Sale</h3>

              <input
                value={editItem.blog_id}
                type="number"
                onChange={(e) =>
                  setEditItem({ ...editItem, blog_id: e.target.value })
                }
              />

              <input
                value={editItem.title}
                onChange={(e) =>
                  setEditItem({ ...editItem, title: e.target.value })
                }
              />

              <textarea
                rows="5"
                value={editItem.requirement?.join("\n")}
                onChange={(e) =>
                  setEditItem({
                    ...editItem,
                    requirement: e.target.value.split("\n"),
                  })
                }
              />

              <input
                value={editItem.image1 || ""}
                onChange={(e) =>
                  setEditItem({ ...editItem, image1: e.target.value })
                }
              />

              <input
                value={editItem.image2 || ""}
                onChange={(e) =>
                  setEditItem({ ...editItem, image2: e.target.value })
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

export default BlogPreSale;
