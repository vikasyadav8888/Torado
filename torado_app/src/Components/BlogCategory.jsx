import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  HiOutlineEye,
  HiOutlineTrash,
  HiOutlinePlusCircle,
} from "react-icons/hi2";

const API = "http://localhost:8000/api/blog_cat";

const BlogCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [viewCategory, setViewCategory] = useState(null);
  const [addCategory, setAddCategory] = useState(false);

  const token = localStorage.getItem("token");

  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/`, authHeader);
      setCategories(res.data);
    } catch (err) {
      console.error("Fetch error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    await axios.delete(`${API}/delete/${id}`, authHeader);
    fetchCategories();
  };

  const handleAdd = async () => {
    await axios.post(`${API}//blog_catagory`, addCategory, authHeader);
    setAddCategory(false);
    fetchCategories();
  };

  return (
    <>
      <div className="usrm-wrapper">
        <div className="usrm-header">
          <h2 className="usrm-title">Blog Category</h2>
          <button className="usrm-add-btn" onClick={() => setAddCategory({})}>
            <HiOutlinePlusCircle /> Add Category
          </button>
        </div>

        <div className="usrm-table-card">
          {loading ? (
            <p className="usrm-loading">Loading categories...</p>
          ) : (
            <table className="usrm-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Category Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat, index) => (
                  <tr key={cat.id} className="usrm-row">
                    <td>{index + 1}</td>
                    <td>{cat.name}</td>
                    <td className="usrm-actions">
                      <HiOutlineEye onClick={() => setViewCategory(cat)} />
                      <HiOutlineTrash onClick={() => handleDelete(cat.id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* VIEW MODAL */}
        {viewCategory && (
          <div className="usrm-modal-overlay">
            <div className="usrm-modal usrm-animate">
              <h3>Category Details</h3>
              <p>
                <b>Name:</b> {viewCategory.name}
              </p>
              <button
                className="usrm-modal-close"
                onClick={() => setViewCategory(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* ADD MODAL */}
        {addCategory && (
          <div className="usrm-modal-overlay">
            <div className="usrm-modal usrm-animate">
              <h3>Add Category</h3>

              <input
                placeholder="Category Name"
                onChange={(e) =>
                  setAddCategory({ ...addCategory, name: e.target.value })
                }
              />

              <div className="usrm-modal-actions">
                <button className="usrm-btn-primary" onClick={handleAdd}>
                  Save
                </button>
                <button
                  className="usrm-btn-danger"
                  onClick={() => setAddCategory(false)}
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

export default BlogCategory;
