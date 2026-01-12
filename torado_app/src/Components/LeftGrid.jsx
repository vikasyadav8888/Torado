import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosGitCompare, IoIosHeartEmpty } from "react-icons/io";
import { FaRegStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoStar } from "react-icons/io5";
import { FaExpand } from "react-icons/fa";
import { useWishlist } from "../Components/useWishlist";
import { useCart } from "../Components/CartContext";
import { toast } from "react-toastify";

const LeftGrid = ({ products }) => {
  const [limit, setLimit] = useState(9);
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { addToWishlist } = useWishlist();
  const { addToCart } = useCart();

  /* ---------- SORT & PAGINATION ---------- */
  const sortedProducts = useMemo(() => {
    let data = [...products];
    if (sort === "low") data.sort((a, b) => Number(a.price) - Number(b.price));
    if (sort === "high") data.sort((a, b) => Number(b.price) - Number(a.price));
    return data;
  }, [products, sort]);

  const totalPages = Math.ceil(sortedProducts.length / limit);

  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * limit;
    return sortedProducts.slice(start, start + limit);
  }, [sortedProducts, page, limit]);

  const goPrev = () => page > 1 && setPage(page - 1);
  const goNext = () => page < totalPages && setPage(page + 1);
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

  return (
    <>
      {/* TOP BAR */}
      <div className="product-topbar">
        <p>
          We found <strong>{products.length}</strong> items for you!
        </p>

        <div className="product-controls">
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
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* GRID */}
      <div className="product-grid two-column">
        {paginatedProducts.map((item) => {
          const filledStars = Math.round(item.rating || 0);
          return (
            <div className="bs-card" key={item.id}>
              {item.tag && (
                <span className={`bs-tag ${item.tag_type}`}>{item.tag}</span>
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
                  {[...Array(5)].map((_, i) =>
                    i < filledStars ? (
                      <IoStar key={i} className="star-filled" />
                    ) : (
                      <FaRegStar key={i} className="star-empty" />
                    )
                  )}
                  <span>({item.rating_count})</span>
                </div>

                <button className="bs-cart-btn" onClick={() => addToCart(item)}>
                  Add To Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* PAGINATION */}
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
    </>
  );
};

export default LeftGrid;
