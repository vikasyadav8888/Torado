import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  HiOutlinePlusCircle,
  HiOutlineEye,
  HiOutlineTrash,
} from "react-icons/hi2";

const API = "http://localhost:8000/api/blog_tag_map";

const TagsMap = () => {
  const [maps, setMaps] = useState([]);
  const [loading, setLoading] = useState(false);

  const [viewMap, setViewMap] = useState(null);
  const [addMap, setAddMap] = useState(false);

  const [blogId, setBlogId] = useState("");
  const [tagId, setTagId] = useState("");

  const token = localStorage.getItem("token");

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchMaps = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/`, authHeader);
      setMaps(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaps();
    // eslint-disable-next-line
  }, []);

  const handleAdd = async () => {
    if (!blogId || !tagId) return alert("Blog ID & Tag ID required");

    await axios.post(
      `${API}/create`,
      { blog_id: blogId, tag_id: tagId },
      authHeader
    );

    setAddMap(false);
    setBlogId("");
    setTagId("");
    fetchMaps();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this mapping?")) return;
    await axios.delete(`${API}/delete/${id}`, authHeader);
    fetchMaps();
  };

  return (
    <>
      <div className="usrm-wrapper">
        <div className="usrm-header">
          <h2 className="usrm-title">Blog – Tag Mapping</h2>
          <button className="usrm-add-btn" onClick={() => setAddMap(true)}>
            <HiOutlinePlusCircle /> Add Mapping
          </button>
        </div>

        <div className="usrm-table-card">
          {loading ? (
            <p className="usrm-loading">Loading mappings...</p>
          ) : (
            <table className="usrm-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Blog ID</th>
                  <th>Tag ID</th>
                  <th>Created At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {maps.map((item, index) => (
                  <tr key={index} className="usrm-row">
                    <td>{index + 1}</td>
                    <td>
                      <span className="btm-chip blog-chip">
                        Blog #{item.blog_id}
                      </span>
                    </td>
                    <td>
                      <span className="btm-chip tag-chip">
                        Tag #{item.tag_id}
                      </span>
                    </td>
                    <td>{new Date(item.created_at).toLocaleDateString()}</td>
                    <td className="usrm-actions">
                      <HiOutlineEye onClick={() => setViewMap(item)} />
                      <HiOutlineTrash
                        onClick={() => handleDelete(item.blog_id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* VIEW MODAL */}
        {viewMap && (
          <div className="usrm-modal-overlay">
            <div className="usrm-modal usrm-animate">
              <h3>Mapping Details</h3>
              <p>
                <b>Blog ID:</b>{" "}
                <span className="btm-chip blog-chip">{viewMap.blog_id}</span>
              </p>
              <p>
                <b>Tag ID:</b>{" "}
                <span className="btm-chip tag-chip">{viewMap.tag_id}</span>
              </p>
              <p>
                <b>Created At:</b>{" "}
                {new Date(viewMap.created_at).toLocaleString()}
              </p>

              <button
                className="usrm-modal-close"
                onClick={() => setViewMap(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* ADD MODAL */}
        {addMap && (
          <div className="usrm-modal-overlay">
            <div className="usrm-modal usrm-animate">
              <h3>Add Blog Tag Mapping</h3>

              <input
                type="number"
                placeholder="Blog ID"
                value={blogId}
                onChange={(e) => setBlogId(e.target.value)}
              />

              <input
                type="number"
                placeholder="Tag ID"
                value={tagId}
                onChange={(e) => setTagId(e.target.value)}
              />

              <div className="usrm-modal-actions">
                <button className="usrm-btn-primary" onClick={handleAdd}>
                  Save
                </button>
                <button
                  className="usrm-btn-danger"
                  onClick={() => setAddMap(false)}
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

export default TagsMap;
