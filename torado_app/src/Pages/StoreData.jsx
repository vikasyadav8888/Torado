import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  HiOutlineEye,
  HiOutlineTrash,
  HiOutlinePlusCircle,
  HiOutlinePencilSquare,
} from "react-icons/hi2";


const API = "http://localhost:8000/api/store_location";

const StoreData = () => {
  const [storeList, setStoreList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const [viewStore, setViewStore] = useState(null);
  const [editStore, setEditStore] = useState(null);
  const [addStore, setAddStore] = useState(null);

  const token = localStorage.getItem("token");

  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchStores = async () => {
    const res = await axios.get(`${API}/`, authHeader);
    setStoreList(res.data.data);
  };

  useEffect(() => {
    fetchStores();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 
  const handleAddStore = async () => {
    await axios.post(`${API}/create`, addStore, authHeader);
    setAddStore(null);
    fetchStores();
  };

  const handleUpdateStore = async () => {
    await axios.post(
      `${API}/update/${editStore.id}`,
      editStore,
      authHeader
    );
    setEditStore(null);
    fetchStores();
  };

  const handleDeleteStore = async (id) => {
    if (!window.confirm("Delete this store location?")) return;
    await axios.delete(`${API}/delete/${id}`, authHeader);
    fetchStores();
  };

  const totalPages = Math.ceil(storeList.length / pageSize);
  const visibleStores = storeList.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="slm-wrapper">
      <div className="slm-header">
        <h2 className="slm-title">Store Location Management</h2>
        <button
          className="slm-add-btn"
          onClick={() =>
            setAddStore({
              store_name: "",
              address: "",
              hours: "",
              mobile: "",
            })
          }
        >
          <HiOutlinePlusCircle /> Add Store
        </button>
      </div>

      <div className="slm-table-box">
        <table className="slm-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Store Name</th>
              <th>Mobile</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {visibleStores.map((store, index) => (
              <tr key={store.id}>
                <td>{index + 1}</td>
                <td>{store.store_name}</td>
                <td>{store.mobile}</td>
                <td>
                  <span className="slm-status">
                    {store.status === 1 ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="slm-actions">
                  <HiOutlineEye onClick={() => setViewStore(store)} />
                  <HiOutlinePencilSquare onClick={() => setEditStore(store)} />
                  <HiOutlineTrash
                    onClick={() => handleDeleteStore(store.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="slm-pagination">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`slm-page-btn ${
              currentPage === i + 1 ? "active" : ""
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {viewStore && (
        <div className="slm-modal-overlay">
          <div className="slm-modal">
            <h3>{viewStore.store_name}</h3>
            <p><b>Address:</b> {viewStore.address}</p>
            <p><b>Hours:</b> {viewStore.hours}</p>
            <p><b>Mobile:</b> {viewStore.mobile}</p>
            <button
              className="slm-close-btn"
              onClick={() => setViewStore(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {addStore && (
        <div className="slm-modal-overlay">
          <div className="slm-modal">
            <h3>Add Store</h3>
            <input
              placeholder="Store Name"
              onChange={(e) =>
                setAddStore({ ...addStore, store_name: e.target.value })
              }
            />
            <input
              placeholder="Address"
              onChange={(e) =>
                setAddStore({ ...addStore, address: e.target.value })
              }
            />
            <input
              placeholder="Opening Hours"
              onChange={(e) =>
                setAddStore({ ...addStore, hours: e.target.value })
              }
            />
            <input
              placeholder="Mobile"
              onChange={(e) =>
                setAddStore({ ...addStore, mobile: e.target.value })
              }
            />
            <div className="slm-modal-actions">
              <button onClick={handleAddStore}>Save</button>
              <button onClick={() => setAddStore(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      
      {editStore && (
        <div className="slm-modal-overlay">
          <div className="slm-modal">
            <h3>Update Store</h3>
            <input
              value={editStore.store_name}
              onChange={(e) =>
                setEditStore({
                  ...editStore,
                  store_name: e.target.value,
                })
              }
            />
            <input
              value={editStore.address}
              onChange={(e) =>
                setEditStore({ ...editStore, address: e.target.value })
              }
            />
            <input
              value={editStore.hours}
              onChange={(e) =>
                setEditStore({ ...editStore, hours: e.target.value })
              }
            />
            <input
              value={editStore.mobile}
              onChange={(e) =>
                setEditStore({ ...editStore, mobile: e.target.value })
              }
            />
            <div className="slm-modal-actions">
              <button onClick={handleUpdateStore}>Update</button>
              <button onClick={() => setEditStore(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreData;
