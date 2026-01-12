import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Components/CartContext";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, updateQty, removeFromCart, subtotal } = useCart();

  return (
    <section className="cart-section">
      <div className="cart-container">
        {/* CART TABLE */}
        <table className="cart-table">
          <thead>
            <tr>
              <th>Remove</th>
              <th>Image</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>
                  <FaTrash
                    className="trash-icon"
                    onClick={() => removeFromCart(item.id)}
                  />
                </td>

                <td>
                  <img src={item.image} alt={item.title} />
                </td>

                <td
                  className="bs-product-title"
                  onClick={() => navigate(`/shop-detail/${item.id}`)}
                >
                  {item.title}
                </td>
                <td>${item.price}</td>

                <td>
                  <div className="qty-box">
                    <button onClick={() => updateQty(item.id, item.qty - 1)}>
                      -
                    </button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)}>
                      +
                    </button>
                  </div>
                </td>

                <td>${(item.price * item.qty).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {cart.length === 0 && <p className="empty-text">Your cart is empty</p>}
        {/* SUMMARY */}
        <div className="checkout-box">
          <h3>Checkout Summary</h3>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>$0.00</span>
          </div>

          <div className="summary-row total">
            <span>Payable Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <button
            className="checkout-btn"
            onClick={() => navigate("/checkout")}
          >
            Proceed To Checkout
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
