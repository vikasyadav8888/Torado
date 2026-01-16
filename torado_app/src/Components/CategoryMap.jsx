import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  HiOutlineEye,
  HiOutlineTrash,
  HiOutlinePlusCircle,
} from "react-icons/hi2";

const API = "http://localhost:8000/api/blogmap";

const CategoryMap = () => {
  const [maps, setMaps] = useState([]);
  const [loading, setLoading] = useState(false);

  const [viewMap, setViewMap] = useState(null);
  const [addMap, setAddMap] = useState(false);

  const token = localStorage.getItem("token");

  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchMaps = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/`, authHeader);
      setMaps(res.data);
    } catch (err) {
      console.error("Fetch error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaps();
    // eslint-disable-next-line
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this mapping?")) return;
    await axios.delete(`${API}/delete/${id}`, authHeader);
    fetchMaps();
  };

  const handleAdd = async () => {
    await axios.post(`${API}/createmap`, addMap, authHeader);
    setAddMap(false);
    fetchMaps();
  };

  return (
    <>
      <div className="usrm-wrapper">
        <div className="usrm-header">
          <h2 className="usrm-title">Blog Category Map</h2>
          <button className="usrm-add-btn" onClick={() => setAddMap({})}>
            <HiOutlinePlusCircle /> Add Map
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
                  <th>Category ID</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {maps.map((map, index) => (
                  <tr key={index} className="usrm-row">
                    <td>{index + 1}</td>
                    <td>{map.blog_id}</td>
                    <td>{map.category_id}</td>
                    <td className="usrm-actions">
                      <HiOutlineEye onClick={() => setViewMap(map)} />
                      <HiOutlineTrash
                        onClick={() => handleDelete(map.id || map.blog_id)}
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
                <b>Blog ID:</b> {viewMap.blog_id}
              </p>
              <p>
                <b>Category ID:</b> {viewMap.category_id}
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
              <h3>Add Blog Category Map</h3>

              <input
                placeholder="Blog ID"
                type="number"
                onChange={(e) =>
                  setAddMap({ ...addMap, blog_id: e.target.value })
                }
              />

              <input
                placeholder="Category ID"
                type="number"
                onChange={(e) =>
                  setAddMap({ ...addMap, category_id: e.target.value })
                }
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

export default CategoryMap;
