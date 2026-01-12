import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token"); // JWT token
      const res = await axios.get(
        "http://localhost:8000/api/orders/my-orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id, e) => {
    e.stopPropagation();
    alert("Cancel order API call here");
  };

  const getOrderStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Order Processing";
      case "confirmed":
        return "Order Confirmed";
      case "shipped":
        return "Order Shipped";
      case "delivered":
        return "Order Delivered";
      default:
        return status;
    }
  };

  if (loading) return <p className="loading">Loading orders...</p>;

  return (
    <section className="fk-orders-page">
      <div className="fk-orders-container">
        <h2 className="fk-title">My Orders</h2>

        {/* ✅ Show message if orders are empty */}
        {orders.length === 0 && (
          <p className="no-orders-message">Your order box is empty</p>
        )}

        {orders.map((order) => (
          <div
            key={order.id}
            className="fk-order-card"
            onClick={() => navigate(`/order-status/${order.id}`)}
          >
            {/* HEADER */}
            <div className="fk-order-header">
              <div>
                <p className="fk-order-no">{order.order_no}</p>
                <p className="fk-order-date">
                  Placed on {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>

              <span className={`fk-status ${order.order_status}`}>
                {getOrderStatusText(order.order_status)}
              </span>
            </div>

            {/* STATUS ROW */}
            <div className="fk-status-row">
              <div>
                <p className="fk-label">Payment Status</p>
                <p className={`fk-value ${order.payment_status}`}>
                  {order.payment_status}
                </p>
              </div>

              <div>
                <p className="fk-label">Shipping Status</p>
                <p className={`fk-value ${order.order_status}`}>
                  {order.order_status}
                </p>
              </div>
            </div>

            {/* AMOUNT */}
            <div className="fk-amount">
              Total Amount: <span>₹{order.total}</span>
            </div>

            {/* FOOTER */}
            {(order.order_status === "pending" ||
              order.order_status === "confirmed") && (
              <div className="fk-order-footer">
                <button
                  className="fk-cancel-btn"
                  onClick={(e) => handleCancel(order.id, e)}
                >
                  Cancel Order
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Orders;
