import React, { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductTabs = ({ productId }) => {
  const { id } = useParams();
  const reviewFormRef = useRef(null);

  // ✅ Route id OR prop id
  const finalProductId = id || productId;

  const [activeTab, setActiveTab] = useState("description");
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    comment: "",
    rating: "",
  });

  /* ================= FETCH PRODUCT ================= */
  const fetchProductDetails = useCallback(async () => {
    if (!finalProductId) return;

    try {
      const res = await axios.get(
        `http://localhost:8000/api/product/${finalProductId}`
      );

      setProduct(res.data?.product || null);
      setReviews(Array.isArray(res.data?.reviews) ? res.data.reviews : []);
    } catch (error) {
      console.error("Product fetch error:", error);
    }
  }, [finalProductId]);

  /* ================= USE EFFECT ================= */
  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  /* ================= REVIEW SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!finalProductId) return;

    try {
      await axios.post("http://localhost:8000/api/review/create", {
        product_id: finalProductId,
        ...formData,
        created_by: 2,
      });

      setFormData({
        name: "",
        email: "",
        website: "",
        comment: "",
        rating: "",
      });

      fetchProductDetails();
    } catch (error) {
      console.error("Review submit error:", error);
    }
  };
  const scrollToReviewForm = () => {
    setActiveTab("review"); // ensure review tab open
    setTimeout(() => {
      reviewFormRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 200);
  };

  if (!product) return <p>Loading product details...</p>;

  return (
    <div className="product-tabs">
      {/* ================= TABS HEADER ================= */}
      <div className="tabs-header">
        <button
          className={activeTab === "description" ? "active" : ""}
          onClick={() => setActiveTab("description")}
        >
          Description
        </button>

        <button
          className={activeTab === "additional" ? "active" : ""}
          onClick={() => setActiveTab("additional")}
        >
          Additional Information
        </button>

        <button
          className={activeTab === "review" ? "active" : ""}
          onClick={() => setActiveTab("review")}
        >
          Review {reviews.length > 0 && `(${reviews.length})`}
        </button>
      </div>

      {/* ================= TABS CONTENT ================= */}
      <div className="tabs-content">
        {/* ================= DESCRIPTION ================= */}
        {activeTab === "description" && (
          <div className="tab-panel">
            <p>{product.long_description || "No description available."}</p>
          </div>
        )}

        {/* ================= ADDITIONAL INFO ================= */}
        {activeTab === "additional" && (
          <div className="tab-panel">
            <table className="info-table">
              <tbody>
                <tr>
                  <th>Brand</th>
                  <td>{product.brand || "-"}</td>
                </tr>
                <tr>
                  <th>Color</th>
                  <td>{product.color || "-"}</td>
                </tr>
                <tr>
                  <th>Size</th>
                  <td>{product.size || "-"}</td>
                </tr>
                <tr>
                  <th>Weight</th>
                  <td>{product.weight || "-"}</td>
                </tr>
                <tr>
                  <th>Dimensions</th>
                  <td>{product.dimensions || "-"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* ================= REVIEW ================= */}
        {activeTab === "review" && (
          <div className="tab-panel">
            {/* Review Header */}
            <div className="review-header">
              <h3 className="cu-header">Customer Review</h3>
              <button className="review-btn" onClick={scrollToReviewForm}>
                Write a Review
              </button>
            </div>

            {/* ================= REVIEW LIST ================= */}
            <div className="rv-comment-list">
              {reviews.length === 0 ? (
                <p className="rv-no-review">No reviews yet.</p>
              ) : (
                reviews.map((item, index) => (
                  <div className="rv-comment-card" key={index}>
                    <div className="rv-avatar">
                      {item.name?.charAt(0).toUpperCase()}
                    </div>

                    <div className="rv-content">
                      <h4>{item.name}</h4>

                      {/* ✅ DATE & TIME BELOW NAME */}
                      <span className="rv-date">
                        {item.created_at &&
                          new Date(item.created_at).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}{" "}
                        {item.created_at &&
                          new Date(item.created_at).toLocaleTimeString(
                            "en-IN",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                      </span>

                      <p>{item.comment}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* ================= REVIEW FORM ================= */}
            <div className="review-form-wrapper" ref={reviewFormRef}>
              <h4 className="wr">Write the Review</h4>

              <form className="review-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Website"
                    value={formData.website}
                    onChange={(e) =>
                      setFormData({ ...formData, website: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <textarea
                    placeholder="Please enter your comments here"
                    value={formData.comment}
                    onChange={(e) =>
                      setFormData({ ...formData, comment: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    placeholder="Rating (0 - 5)"
                    value={formData.rating}
                    onChange={(e) =>
                      setFormData({ ...formData, rating: e.target.value })
                    }
                    required
                  />
                </div>

                <button type="submit" className="submit-btn">
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
