import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Components/CartContext";
import { useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";

const Checkout = () => {
  const { cart, subtotal } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    payment: "cod",
  });

  useEffect(() => {
    if (cart.length === 0) {
      navigate("/cart");
    }
  }, [cart, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: form.address,
      city: form.city,
      state: form.state,
      zip: form.zip,

      payment_method: form.payment,
      transaction_id: null,

      total: subtotal,
      created_by: null, // ✅ backend JWT se set hoga

      items: cart.map((item) => ({
        product_id: item.id,
        title: item.title,
        price: item.price,
        qty: item.qty,
      })),
    };

    try {
      const token = localStorage.getItem("token"); // ✅ ADDED

      await axios.post(
        "http://localhost:8000/api/orders/order",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ ADDED
          },
        }
      );

      toast.success("Order placed successfully");
      navigate("/order-success");
    } catch (err) {
      toast.error("Order failed");
      console.error(err);
    }
  };

  return (
    <>
      <section className="about-hero">
        <div className="about-hero-overlay"></div>

        <div className="about-hero-content">
          <h1>Checkout</h1>
          <p>
            Home <span>/</span> <span className="active">Checkout</span>
          </p>
        </div>
      </section>
      <section className="section-main2">
        <section className="checkout-section">
          <div className="checkout-container">
            {/* BILLING FORM */}
            <form className="billing-box" onSubmit={placeOrder}>
              <h3>Billing Details</h3>

              {/* GRID START */}
              <div className="form-grid">
                <input
                  name="name"
                  placeholder="Full Name"
                  onChange={handleChange}
                  required
                />
                <input
                  name="email"
                  placeholder="Email Address"
                  onChange={handleChange}
                  required
                />

                <input
                  name="phone"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  required
                />
                <input
                  name="zip"
                  placeholder="Zip Code"
                  onChange={handleChange}
                  required
                />

                <textarea
                  name="address"
                  placeholder="Street Address"
                  onChange={handleChange}
                  required
                ></textarea>

                <input
                  name="city"
                  placeholder="City"
                  onChange={handleChange}
                  required
                />
                <input
                  name="state"
                  placeholder="State"
                  onChange={handleChange}
                  required
                />
              </div>
              {/* GRID END */}

              {/* PAYMENT METHOD */}
              <div className="payment-box">
                <h4>Payment Method</h4>

                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={form.payment === "cod"}
                    onChange={handleChange}
                  />
                  Cash on Delivery
                </label>

                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    onChange={handleChange}
                  />
                  Credit / Debit Card
                </label>

                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    onChange={handleChange}
                  />
                  UPI / Google Pay / PhonePe
                </label>
              </div>

              <button type="submit" className="place-order-btn">
                Place Order
              </button>
            </form>

            {/* ORDER SUMMARY */}
            <div className="order-summary">
              <h3>Your Order</h3>

              {cart.map((item) => (
                <div className="order-item" key={item.id}>
                  <div className="order-left">
                    <img src={item.image} alt={item.title} />
                    <div>
                      <p className="order-title">{item.title}</p>
                      <span className="order-qty">Qty: {item.qty}</span>
                    </div>
                  </div>

                  <div className="order-price">
                    ${(item.price * item.qty).toFixed(2)}
                  </div>
                </div>
              ))}

              <div className="order-total">
                <strong>Total</strong>
                <strong>${subtotal.toFixed(2)}</strong>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default Checkout;
