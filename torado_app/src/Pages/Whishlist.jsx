import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../Components/useWishlist";
import { useCart } from "../Components/CartContext";

const Wishlist = () => {
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <>
      <section className="about-hero">
        <div className="about-hero-overlay"></div>

        <div className="about-hero-content">
          <h1>Wishlist</h1>
          <p>
            Home <span>/</span> <span className="active">Wishlist</span>
          </p>
        </div>
      </section>
      <section className="wishlist-section">
        <div className="wishlist-container">
          <table className="wishlist-table">
            <thead>
              <tr>
                <th>Trash</th>
                <th>Image</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>In Stock</th>
                <th>Add To Cart</th>
              </tr>
            </thead>

            <tbody>
              {wishlist.map((item) => (
                <tr key={item.id}>
                  <td>
                    <FaTrash
                      className="trash-icon"
                      onClick={() => removeFromWishlist(item.id)}
                    />
                  </td>

                  <td>
                    <img src={item.image} alt="" />
                  </td>

                  <td
                    className="bs-product-title"
                    onClick={() => navigate(`/shop-detail/${item.id}`)}
                  >
                    {item.title}
                  </td>
                  <td>${item.price}</td>
                  <td className="stock">{item.availability}</td>
                  <td>
                    <button
                      className="add-cart-btn"
                      onClick={() => addToCart(item)}
                    >
                      Add To Cart
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {wishlist.length === 0 && (
            <p className="empty-text">Your wishlist is empty</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Wishlist;
