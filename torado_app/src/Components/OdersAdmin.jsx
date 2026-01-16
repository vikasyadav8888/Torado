import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  HiOutlineEye,
  HiOutlineTrash,
  HiOutlinePencilSquare,
} from "react-icons/hi2";

const API = "http://localhost:8000/api/orders";

const OdersAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewOrder, setViewOrder] = useState(null);

  // 🔹 ADDITION
  const [editOrder, setEditOrder] = useState(null);

  const token = localStorage.getItem("token");

  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API, authHeader);
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this order?")) return;
    await axios.delete(`${API}/delete/${id}`, authHeader);
    fetchOrders();
  };

  // 🔹 ADDITION
  const handleUpdate = async () => {
    await axios.put(`${API}/update/${editOrder.id}`, editOrder, authHeader);
    setEditOrder(null);
    fetchOrders();
  };

  return (
    <div className="usrm-wrapper">
      <div className="usrm-header">
        <h2 className="usrm-title">Orders Management</h2>
      </div>

      <div className="usrm-table-card">
        {loading ? (
          <p className="usrm-loading">Loading orders...</p>
        ) : (
          <table className="usrm-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Order No</th>
                <th>Name</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Order Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <tr key={order.id} className="usrm-row">
                  <td>{index + 1}</td>
                  <td>{order.order_no}</td>
                  <td>{order.name}</td>
                  <td>₹{order.total}</td>
                  <td>
                    <span className="usrm-role usrm-user">
                      {order.payment_method}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`usrm-status usrm-status-${order.order_status}`}
                    >
                      {order.order_status}
                    </span>
                  </td>
                  <td className="usrm-actions">
                    <HiOutlineEye onClick={() => setViewOrder(order)} />
                    <HiOutlinePencilSquare
                      onClick={() => setEditOrder(order)}
                    />
                    <HiOutlineTrash onClick={() => handleDelete(order.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* -------- VIEW MODAL -------- */}
      {viewOrder && (
        <div className="usrm-modal-overlay">
          <div className="usrm-modal usrm-animate">
            <h3>Order Details</h3>

            <p>
              <b>Order No:</b> {viewOrder.order_no}
            </p>
            <p>
              <b>Name:</b> {viewOrder.name}
            </p>
            <p>
              <b>Email:</b> {viewOrder.email}
            </p>
            <p>
              <b>Phone:</b> {viewOrder.phone}
            </p>
            <p>
              <b>Address:</b> {viewOrder.address}
            </p>
            <p>
              <b>Total:</b> ₹{viewOrder.total}
            </p>
            <p>
              <b>Payment:</b> {viewOrder.payment_method}
            </p>
            <p>
              <b>Order Status:</b> {viewOrder.order_status}
            </p>

            <button
              className="usrm-modal-close"
              onClick={() => setViewOrder(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* -------- UPDATE MODAL (ADDED) -------- */}
      {editOrder && (
        <div className="usrm-modal-overlay">
          <div className="usrm-modal usrm-animate">
            <h3>Update Order</h3>

            <input
              value={editOrder.name}
              onChange={(e) =>
                setEditOrder({ ...editOrder, name: e.target.value })
              }
              placeholder="Customer Name"
            />

            <input
              value={editOrder.phone}
              onChange={(e) =>
                setEditOrder({ ...editOrder, phone: e.target.value })
              }
              placeholder="Phone"
            />

            <textarea
              value={editOrder.address}
              onChange={(e) =>
                setEditOrder({ ...editOrder, address: e.target.value })
              }
              placeholder="Address"
            />

            <input
              value={editOrder.city}
              onChange={(e) =>
                setEditOrder({ ...editOrder, city: e.target.value })
              }
              placeholder="City"
            />

            <input
              value={editOrder.state}
              onChange={(e) =>
                setEditOrder({ ...editOrder, state: e.target.value })
              }
              placeholder="State"
            />

            <input
              value={editOrder.zip}
              onChange={(e) =>
                setEditOrder({ ...editOrder, zip: e.target.value })
              }
              placeholder="Zip Code"
            />

            <select
              value={editOrder.payment_status}
              onChange={(e) =>
                setEditOrder({
                  ...editOrder,
                  payment_status: e.target.value,
                })
              }
            >
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
            </select>

            <select
              value={editOrder.order_status}
              onChange={(e) =>
                setEditOrder({
                  ...editOrder,
                  order_status: e.target.value,
                })
              }
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <div className="usrm-modal-actions">
              <button className="usrm-btn-primary" onClick={handleUpdate}>
                Update
              </button>
              <button
                className="usrm-btn-danger"
                onClick={() => setEditOrder(null)}
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

export default OdersAdmin;
