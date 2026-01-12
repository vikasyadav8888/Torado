import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  HiOutlineEye,
  HiOutlineTrash,
  HiOutlinePlusCircle,
} from "react-icons/hi2";

const API = "http://localhost:8000/api/catagory_product";

const ProductCatagory = () => {
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
      const res = await axios.get(API, authHeader);
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAdd = async () => {
    await axios.post(`${API}/create`, addCategory, authHeader);
    setAddCategory(false);
    fetchCategories();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    await axios.post(`${API}/hard-delete/${id}`, {}, authHeader);
    fetchCategories();
  };

  return (
    <div className="usrm-wrapper">
      <div className="usrm-header">
        <h2 className="usrm-title">Category Management</h2>
        <button
          className="usrm-add-btn"
          onClick={() => setAddCategory({})}
        >
          <HiOutlinePlusCircle /> Add Category
        </button>
      </div>

      {/* TABLE */}
      <div className="usrm-table-card">
        {loading ? (
          <p className="usrm-loading">Loading categories...</p>
        ) : (
          <table className="usrm-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Slug</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((cat, index) => (
                <tr key={cat.id} className="usrm-row">
                  <td>{index + 1}</td>
                  <td>{cat.name}</td>
                  <td className="cat-slug">{cat.slug}</td>
                  <td>
                    <span className="usrm-role usrm-user">
                      {cat.status === 1 ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="usrm-actions">
                    <HiOutlineEye
                      onClick={() => setViewCategory(cat)}
                    />
                    <HiOutlineTrash
                      onClick={() => handleDelete(cat.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      
      {viewCategory && (
        <div className="usrm-modal-overlay">
          <div className="usrm-modal usrm-animate">
            <h3>Category Details</h3>

            <p><b>Name:</b> {viewCategory.name}</p>
            <p><b>Slug:</b> {viewCategory.slug}</p>
            <p><b>Status:</b> {viewCategory.status === 1 ? "Active" : "Inactive"}</p>
            <p><b>Created At:</b> {new Date(viewCategory.created_at).toLocaleString()}</p>

            <button
              className="usrm-btn-danger"
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

            <input
              placeholder="Slug"
              onChange={(e) =>
                setAddCategory({ ...addCategory, slug: e.target.value })
              }
            />

            <select
              onChange={(e) =>
                setAddCategory({ ...addCategory, status: e.target.value })
              }
            >
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>

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
  );
};

export default ProductCatagory;
