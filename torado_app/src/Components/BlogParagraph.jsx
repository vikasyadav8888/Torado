import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  HiOutlineEye,
  HiOutlineTrash,
  HiOutlinePlusCircle,
  HiOutlinePencilSquare,
} from "react-icons/hi2";

const API = "http://localhost:8000/api/blog_para";

const BlogParagraph = () => {
  const [paras, setParas] = useState([]);
  const [loading, setLoading] = useState(false);

  const [viewPara, setViewPara] = useState(null);
  const [addPara, setAddPara] = useState(false);
  const [editPara, setEditPara] = useState(null);

  const token = localStorage.getItem("token");
  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchParas = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/`, authHeader);
      setParas(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParas();
    // eslint-disable-next-line
  }, []);

  const handleAdd = async () => {
    await axios.post(`${API}/create`, addPara, authHeader);
    setAddPara(false);
    fetchParas();
  };

  const handleUpdate = async () => {
    await axios.put(`${API}/update/${editPara.id}`, editPara, authHeader);
    setEditPara(null);
    fetchParas();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this paragraph?")) return;
    await axios.delete(`${API}/delete/${id}`, authHeader);
    fetchParas();
  };

  return (
    <>
      <div className="usrm-wrapper">
        <div className="usrm-header">
          <h2 className="usrm-title">Blog Paragraphs</h2>
          <button className="usrm-add-btn" onClick={() => setAddPara({})}>
            <HiOutlinePlusCircle /> Add Paragraph
          </button>
        </div>

        <div className="usrm-table-card">
          {loading ? (
            <p className="usrm-loading">Loading paragraphs...</p>
          ) : (
            <table className="usrm-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Blog ID</th>
                  <th>Order</th>
                  <th>Content Preview</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paras.map((p, index) => (
                  <tr key={p.id}>
                    <td>{index + 1}</td>
                    <td>
                      <span className="bp-chip blog-chip">
                        Blog #{p.blog_id}
                      </span>
                    </td>
                    <td>
                      <span className="bp-chip order-chip">
                        {p.paragraph_order}
                      </span>
                    </td>
                    <td className="bp-preview">{p.content.slice(0, 80)}...</td>
                    <td className="usrm-actions">
                      <HiOutlineEye onClick={() => setViewPara(p)} />
                      <HiOutlinePencilSquare onClick={() => setEditPara(p)} />
                      <HiOutlineTrash onClick={() => handleDelete(p.id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* VIEW MODAL */}
        {viewPara && (
          <div className="usrm-modal-overlay">
            <div className="usrm-modal usrm-animate bp-modal">
              <h3>Paragraph Detail</h3>
              <p>
                <b>Blog ID:</b> {viewPara.blog_id}
              </p>
              <p>
                <b>Order:</b> {viewPara.paragraph_order}
              </p>
              <div className="bp-content-box">{viewPara.content}</div>

              <button
                className="usrm-modal-close"
                onClick={() => setViewPara(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* ADD MODAL */}
        {addPara && (
          <div className="usrm-modal-overlay">
            <div className="usrm-modal usrm-animate bp-modal">
              <h3>Add Paragraph</h3>

              <input
                placeholder="Blog ID"
                type="number"
                onChange={(e) =>
                  setAddPara({ ...addPara, blog_id: e.target.value })
                }
              />

              <input
                placeholder="Paragraph Order"
                type="number"
                onChange={(e) =>
                  setAddPara({
                    ...addPara,
                    paragraph_order: e.target.value,
                  })
                }
              />

              <textarea
                placeholder="Paragraph Content"
                rows="6"
                onChange={(e) =>
                  setAddPara({ ...addPara, content: e.target.value })
                }
              />

              <div className="usrm-modal-actions">
                <button className="usrm-btn-primary" onClick={handleAdd}>
                  Save
                </button>
                <button
                  className="usrm-btn-danger"
                  onClick={() => setAddPara(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* UPDATE MODAL */}
        {editPara && (
          <div className="usrm-modal-overlay">
            <div className="usrm-modal usrm-animate bp-modal">
              <h3>Update Paragraph</h3>

              <input
                value={editPara.blog_id}
                type="number"
                onChange={(e) =>
                  setEditPara({
                    ...editPara,
                    blog_id: e.target.value,
                  })
                }
              />

              <input
                value={editPara.paragraph_order}
                type="number"
                onChange={(e) =>
                  setEditPara({
                    ...editPara,
                    paragraph_order: e.target.value,
                  })
                }
              />

              <textarea
                rows="6"
                value={editPara.content}
                onChange={(e) =>
                  setEditPara({
                    ...editPara,
                    content: e.target.value,
                  })
                }
              />

              <div className="usrm-modal-actions">
                <button className="usrm-btn-primary" onClick={handleUpdate}>
                  Update
                </button>
                <button
                  className="usrm-btn-danger"
                  onClick={() => setEditPara(null)}
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

export default BlogParagraph;
