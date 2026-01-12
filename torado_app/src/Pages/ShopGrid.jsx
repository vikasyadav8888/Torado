import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaExpand,
  FaRegStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { IoStar } from "react-icons/io5";
import { IoIosGitCompare, IoIosHeartEmpty } from "react-icons/io";
import { toast } from "react-toastify";
import { useWishlist } from "../Components/useWishlist";
import { useCart } from "../Components/CartContext";

const ShopGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [limit, setLimit] = useState(9);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { addToWishlist } = useWishlist();
  const { addToCart } = useCart();

  /* ---------- FETCH PRODUCTS ---------- */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/product/");
        setProducts(res.data);
      } catch (err) {
        setError("Failed to load products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleWishlist = (item) => {
    addToWishlist({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
      availability: item.availability,
    });
    toast.success("Item added into your wishlist");
  };

  /* ---------- FILTER + SORT ---------- */
  const filteredProducts = useMemo(() => {
    let data = [...products];

    if (search) {
      data = data.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === "high") {
      data.sort((a, b) => Number(b.price) - Number(a.price));
    }

    if (sort === "low") {
      data.sort((a, b) => Number(a.price) - Number(b.price));
    }

    return data;
  }, [products, search, sort]);

  const totalPages = Math.ceil(filteredProducts.length / limit);

  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * limit;
    return filteredProducts.slice(start, start + limit);
  }, [filteredProducts, page, limit]);

  const goPrev = () => page > 1 && setPage(page - 1);
  const goNext = () => page < totalPages && setPage(page + 1);

  /* ---------- UI STATES ---------- */
  if (loading) return <p className="loading">Loading products...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <>
      <section className="about-hero">
        <div className="about-hero-overlay"></div>

        <div className="about-hero-content">
          <h1>Shop List</h1>
          <p>
            Home <span>/</span> <span className="active">Shop List</span>
          </p>
        </div>
      </section>
      <section className="section-main2">
        <section className="product-section">
          {/* ---------- TOP BAR ---------- */}
          <div className="product-topbar">
            <p>
              We found <strong>{filteredProducts.length}</strong> items for you!
            </p>

            <div className="product-controls">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />

              <select
                value={limit}
                onChange={(e) => {
                  setLimit(Number(e.target.value));
                  setPage(1);
                }}
              >
                <option value={9}>Show 9</option>
                <option value={50}>Show 50</option>
                <option value={100}>Show 100</option>
              </select>

              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="">Sort By: Featured</option>
                <option value="high">Price: High to Low</option>
                <option value="low">Price: Low to High</option>
              </select>
            </div>
          </div>

          {/* ---------- GRID ---------- */}
          <div className="product-grid">
            {paginatedProducts.map((item) => {
              const filledStars = Math.round(item.rating || 0);
              const totalStars = 5;

              return (
                <div className="bs-card" key={item.id}>
                  {item.tag && (
                    <span className={`bs-tag ${item.tag_type}`}>
                      {item.tag}
                    </span>
                  )}

                  <div className="bs-hover-icons">
                    <button>
                      <IoIosHeartEmpty
                        className="wishlist-icon"
                        onClick={() => handleWishlist(item)}
                      />
                    </button>
                    <button>
                      <IoIosGitCompare />
                    </button>
                    <button>
                      <FaExpand />
                    </button>
                  </div>

                  <img src={item.image} alt={item.title} />

                  <div className="bs-content">
                    <div className="bs-price">
                      ${item.price}
                      {item.old_price && <span>${item.old_price}</span>}
                    </div>

                    <h3
                      className="bs-product-title"
                      onClick={() => navigate(`/shop-detail/${item.id}`)}
                    >
                      {item.title}
                    </h3>

                    <div className="bs-rating">
                      {[...Array(totalStars)].map((_, i) =>
                        i < filledStars ? (
                          <IoStar key={i} className="bs-star filled" />
                        ) : (
                          <FaRegStar key={i} className="bs-star empty" />
                        )
                      )}
                      <span>({item.rating_count})</span>
                    </div>

                    <button
                      className="bs-cart-btn"
                      onClick={() => addToCart(item)}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ---------- PAGINATION ---------- */}
          {totalPages > 1 && (
            <div className="pagination">
              <button onClick={goPrev} disabled={page === 1}>
                <FaChevronLeft />
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={page === i + 1 ? "active" : ""}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}

              <button onClick={goNext} disabled={page === totalPages}>
                <FaChevronRight />
              </button>
            </div>
          )}
        </section>
      </section>
    </>
  );
};

export default ShopGrid;
