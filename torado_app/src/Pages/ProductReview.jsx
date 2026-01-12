import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  HiOutlineEye,
  HiOutlineTrash,
  HiOutlinePlusCircle,
} from "react-icons/hi2";

const API = "http://localhost:8000/api/review";

const ProductReview = () => {
  const [reviews, setReviews] = useState([]);
  const [viewReview, setViewReview] = useState(null);
  const [addReview, setAddReview] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API, authHeader);
      setReviews(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this review?")) return;
    await axios.post(`${API}/hard-delete`, { id }, authHeader);
    fetchReviews();
  };

  const handleAdd = async () => {
    await axios.post(`${API}/create`, addReview, authHeader);
    setAddReview(false);
    fetchReviews();
  };

  return (
    <div className="usrm-wrapper w-100">
      {/* HEADER */}
      <div className="usrm-header">
        <h2 className="usrm-title">Product Reviews</h2>

        <button
          className="usrm-add-btn"
          onClick={() => setAddReview({})}
        >
          <HiOutlinePlusCircle /> Add Review
        </button>
      </div>

      {/* TABLE */}
      <div className="usrm-table-card">
        {loading ? (
          <p className="usrm-loading">Loading reviews...</p>
        ) : (
          <table className="usrm-table">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Comment</th>
                <th>Rating</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {reviews.map((rev, index) => (
                <tr key={rev.id} className="usrm-row">
                  <td>{index + 1}</td>

                  <td>
                    <div className="rvw-user">
                      <span className="rvw-name">{rev.name}</span>
                      <span className="rvw-email">{rev.email}</span>
                    </div>
                  </td>

                  <td className="rvw-comment">
                    {rev.comment}
                  </td>

                  <td>
                    <span className="rvw-rating">
                      ⭐ {rev.rating}
                    </span>
                  </td>

                  <td className="usrm-actions">
                    <HiOutlineEye onClick={() => setViewReview(rev)} />
                    <HiOutlineTrash onClick={() => handleDelete(rev.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* VIEW MODAL */}
      {viewReview && (
        <div className="usrm-modal-overlay">
          <div className="usrm-modal usrm-animate">
            <h3>Review Details</h3>

            <p><b>Name:</b> {viewReview.name}</p>
            <p><b>Email:</b> {viewReview.email}</p>
            <p><b>Website:</b> {viewReview.website}</p>
            <p><b>Rating:</b> ⭐ {viewReview.rating}</p>

            <div className="rvw-modal-comment">
              {viewReview.comment}
            </div>

            <button
              className="usrm-btn-danger"
              onClick={() => setViewReview(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ADD MODAL */}
      {addReview && (
        <div className="usrm-modal-overlay">
          <div className="usrm-modal usrm-animate">
            <h3>Add Review</h3>

            <input
              placeholder="Product ID"
              onChange={(e) =>
                setAddReview({ ...addReview, product_id: e.target.value })
              }
            />

            <input
              placeholder="Name"
              onChange={(e) =>
                setAddReview({ ...addReview, name: e.target.value })
              }
            />

            <input
              placeholder="Email"
              onChange={(e) =>
                setAddReview({ ...addReview, email: e.target.value })
              }
            />

            <input
              placeholder="Website"
              onChange={(e) =>
                setAddReview({ ...addReview, website: e.target.value })
              }
            />

            <textarea
              placeholder="Comment"
              rows="3"
              onChange={(e) =>
                setAddReview({ ...addReview, comment: e.target.value })
              }
            />

            <input
              placeholder="Rating (1 - 5)"
              onChange={(e) =>
                setAddReview({ ...addReview, rating: e.target.value })
              }
            />

            <div className="usrm-modal-actions">
              <button className="usrm-btn-primary" onClick={handleAdd}>
                Save
              </button>
              <button
                className="usrm-btn-danger"
                onClick={() => setAddReview(false)}
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

export default ProductReview;
