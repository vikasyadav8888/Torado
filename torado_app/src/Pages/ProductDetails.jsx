import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  HiOutlineEye,
  HiOutlineTrash,
  HiOutlinePlusCircle,
  HiOutlinePencilSquare,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi2";

const API = "http://localhost:8000/api/product";

const ProductDetails = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [viewProduct, setViewProduct] = useState(null);
  const [addProduct, setAddProduct] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const token = localStorage.getItem("token");

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API, authHeader);
      setProducts(res.data);
      setCurrentPage(1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleAdd = async () => {
    await axios.post(`${API}/create`, addProduct, authHeader);
    setAddProduct(false);
    fetchProducts();
  };


  const handleUpdate = async () => {
    await axios.put(`${API}/update/${editProduct.id}`, editProduct, authHeader);
    setEditProduct(null);
    fetchProducts();
  };

 
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await axios.post(`${API}/hard-delete/${id}`, {}, authHeader);
    fetchProducts();
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="usrm-wrapper">
      
      <div className="usrm-header">
        <h2 className="usrm-title">Product Management</h2>
        <button className="usrm-add-btn" onClick={() => setAddProduct({})}>
          <HiOutlinePlusCircle /> Add Product
        </button>
      </div>

      <div className="usrm-table-card">
        {loading ? (
          <p className="usrm-loading">Loading products...</p>
        ) : (
          <>
            <table className="usrm-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Availability</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentProducts.map((prod, index) => (
                  <tr key={prod.id} className="usrm-row">
                    <td>{index + 1}</td>
                    <td>{prod.title}</td>
                    <td>{prod.category_name}</td>
                    <td>
                      ${prod.price}{" "}
                      {prod.old_price && (
                        <span
                          style={{
                            textDecoration: "line-through",
                            color: "#888",
                            fontSize: "12px",
                          }}
                        >
                          ${prod.old_price}
                        </span>
                      )}
                    </td>
                    <td>{prod.availability}</td>
                    <td className="usrm-actions">
                      <HiOutlineEye onClick={() => setViewProduct(prod)} />
                      <HiOutlinePencilSquare
                        onClick={() => setEditProduct(prod)}
                      />
                      <HiOutlineTrash onClick={() => handleDelete(prod.id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {totalPages > 1 && (
              <div className="usrm-pagination">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                >
                  <HiChevronLeft />
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    className={currentPage === i + 1 ? "active" : ""}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                >
                  <HiChevronRight />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* VIEW MODAL */}
      {viewProduct && (
        <div className="usrm-modal-overlay">
          <div className="usrm-modal usrm-animate prd-view-modal">
            {/* HEADER */}
            <div className="prd-view-header">
              <h3>Product Details</h3>
              <button
                className="prd-close-btn"
                onClick={() => setViewProduct(null)}
              >
                ✕
              </button>
            </div>

            <div className="prd-view-body">
           
              <div className="prd-view-image">
                {viewProduct.image ? (
                  <img src={viewProduct.image} alt={viewProduct.title} />
                ) : (
                  <div className="prd-image-placeholder">No Image</div>
                )}
              </div>

              <div className="prd-view-info">
                <div className="prd-info-row">
                  <span>Title</span>
                  <p>{viewProduct.title}</p>
                </div>

                <div className="prd-info-row">
                  <span>Short Description</span>
                  <p>{viewProduct.short_description}</p>
                </div>

                <div className="prd-info-row">
                  <span>Long Description</span>
                  <p>{viewProduct.long_description}</p>
                </div>

                <div className="prd-info-grid">
                  <div className="prd-info-box">
                    <span>Price</span>
                    <p>₹{viewProduct.price}</p>
                  </div>

                  {viewProduct.old_price && (
                    <div className="prd-info-box old">
                      <span>Old Price</span>
                      <p>₹{viewProduct.old_price}</p>
                    </div>
                  )}

                  <div className="prd-info-box">
                    <span>Availability</span>
                    <p>{viewProduct.availability}</p>
                  </div>

                  <div className="prd-info-box">
                    <span>Category</span>
                    <p>{viewProduct.category_name}</p>
                  </div>

                  <div className="prd-info-box">
                    <span>Tags</span>
                    <p>{viewProduct.tags}</p>
                  </div>

                  <div className="prd-info-box highlight">
                    <span>Offer Tag</span>
                    <p>
                      {viewProduct.tag} ({viewProduct.tag_type})
                    </p>
                  </div>

                  <div className="prd-info-box">
                    <span>Brand</span>
                    <p>{viewProduct.brand}</p>
                  </div>

                  <div className="prd-info-box">
                    <span>Color</span>
                    <p>{viewProduct.color}</p>
                  </div>

                  <div className="prd-info-box">
                    <span>Size</span>
                    <p>{viewProduct.size}</p>
                  </div>

                  <div className="prd-info-box">
                    <span>Weight</span>
                    <p>{viewProduct.weight}</p>
                  </div>

                  <div className="prd-info-box">
                    <span>Dimensions</span>
                    <p>{viewProduct.dimensions}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="prd-view-footer">
              <button
                className="usrm-btn-danger"
                onClick={() => setViewProduct(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {addProduct && (
        <div className="usrm-modal-overlay">
          <div
            className="usrm-modal usrm-animate"
            style={{ maxHeight: "90vh", overflowY: "auto" }}
          >
            <h3>Add Product</h3>

            <input
              placeholder="Title"
              onChange={(e) =>
                setAddProduct({ ...addProduct, title: e.target.value })
              }
            />
            <textarea
              placeholder="Short Description"
              rows={3}
              onChange={(e) =>
                setAddProduct({
                  ...addProduct,
                  short_description: e.target.value,
                })
              }
            />
            <textarea
              placeholder="Long Description"
              rows={5}
              onChange={(e) =>
                setAddProduct({
                  ...addProduct,
                  long_description: e.target.value,
                })
              }
            />

            <div
              className="usrm-input-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
              }}
            >
              <input
                placeholder="Price"
                type="number"
                onChange={(e) =>
                  setAddProduct({ ...addProduct, price: e.target.value })
                }
              />
              <input
                placeholder="Old Price"
                type="number"
                onChange={(e) =>
                  setAddProduct({ ...addProduct, old_price: e.target.value })
                }
              />
              <input
                placeholder="Category ID"
                type="number"
                onChange={(e) =>
                  setAddProduct({ ...addProduct, category_id: e.target.value })
                }
              />
              <input
                placeholder="Tags"
                onChange={(e) =>
                  setAddProduct({ ...addProduct, tags: e.target.value })
                }
              />
              <input
                placeholder="Offer Tag"
                onChange={(e) =>
                  setAddProduct({ ...addProduct, tag: e.target.value })
                }
              />
              <input
                placeholder="Tag Type"
                onChange={(e) =>
                  setAddProduct({ ...addProduct, tag_type: e.target.value })
                }
              />
              <input
                placeholder="Brand"
                onChange={(e) =>
                  setAddProduct({ ...addProduct, brand: e.target.value })
                }
              />
              <input
                placeholder="Color"
                onChange={(e) =>
                  setAddProduct({ ...addProduct, color: e.target.value })
                }
              />
              <input
                placeholder="Size"
                onChange={(e) =>
                  setAddProduct({ ...addProduct, size: e.target.value })
                }
              />
              <input
                placeholder="Weight"
                onChange={(e) =>
                  setAddProduct({ ...addProduct, weight: e.target.value })
                }
              />
              <input
                placeholder="Dimensions"
                onChange={(e) =>
                  setAddProduct({ ...addProduct, dimensions: e.target.value })
                }
              />
              <input
                placeholder="Availability"
                onChange={(e) =>
                  setAddProduct({ ...addProduct, availability: e.target.value })
                }
              />
              <input
                placeholder="Image URL"
                onChange={(e) =>
                  setAddProduct({ ...addProduct, image: e.target.value })
                }
              />
            </div>

            <div className="usrm-modal-actions">
              <button className="usrm-btn-primary" onClick={handleAdd}>
                Save
              </button>
              <button
                className="usrm-btn-danger"
                onClick={() => setAddProduct(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}


      {editProduct && (
        <div className="usrm-modal-overlay">
          <div
            className="usrm-modal usrm-animate"
            style={{ maxHeight: "90vh", overflowY: "auto" }}
          >
            <h3>Edit Product</h3>

            <input
              value={editProduct.title}
              onChange={(e) =>
                setEditProduct({ ...editProduct, title: e.target.value })
              }
            />
            <textarea
              rows={3}
              value={editProduct.short_description}
              onChange={(e) =>
                setEditProduct({
                  ...editProduct,
                  short_description: e.target.value,
                })
              }
            />
            <textarea
              rows={5}
              value={editProduct.long_description}
              onChange={(e) =>
                setEditProduct({
                  ...editProduct,
                  long_description: e.target.value,
                })
              }
            />

            <div
              className="usrm-input-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
              }}
            >
              <input
                type="number"
                value={editProduct.price}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, price: e.target.value })
                }
              />
              <input
                type="number"
                value={editProduct.old_price}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, old_price: e.target.value })
                }
              />
              <input
                type="number"
                value={editProduct.category_id}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    category_id: e.target.value,
                  })
                }
              />
              <input
                value={editProduct.tags}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, tags: e.target.value })
                }
              />
              <input
                value={editProduct.tag}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, tag: e.target.value })
                }
              />
              <input
                value={editProduct.tag_type}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, tag_type: e.target.value })
                }
              />
              <input
                value={editProduct.brand}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, brand: e.target.value })
                }
              />
              <input
                value={editProduct.color}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, color: e.target.value })
                }
              />
              <input
                value={editProduct.size}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, size: e.target.value })
                }
              />
              <input
                value={editProduct.weight}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, weight: e.target.value })
                }
              />
              <input
                value={editProduct.dimensions}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, dimensions: e.target.value })
                }
              />
              <input
                value={editProduct.availability}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    availability: e.target.value,
                  })
                }
              />
              <input
                value={editProduct.image}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, image: e.target.value })
                }
              />
            </div>

            <div className="usrm-modal-actions">
              <button className="usrm-btn-primary" onClick={handleUpdate}>
                Update
              </button>
              <button
                className="usrm-btn-danger"
                onClick={() => setEditProduct(null)}
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

export default ProductDetails;
