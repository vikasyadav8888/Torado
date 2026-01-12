import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  HiOutlineEye,
  HiOutlineTrash,
  HiOutlinePlusCircle,
  HiOutlinePencilSquare,
} from "react-icons/hi2";

const API = "http://localhost:8000/api/users";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 6;

  const [viewUser, setViewUser] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [addUser, setAddUser] = useState(false);

  const token = localStorage.getItem("token");

  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API, authHeader);
      setUsers(res.data);
    } catch (err) {
      console.error("Fetch error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    await axios.delete(`${API}/delete/${id}`, authHeader);
    fetchUsers();
  };

  const handleUpdate = async () => {
    await axios.put(`${API}/update/${editUser.id}`, editUser, authHeader);
    setEditUser(null);
    fetchUsers();
  };

  const handleAdd = async () => {
    await axios.post(API, addUser, authHeader);
    setAddUser(false);
    fetchUsers();
  };

  const totalPages = Math.ceil(users.length / limit);
  const paginatedUsers = users.slice((page - 1) * limit, page * limit);

  return (
    <div className="usrm-wrapper">
      <div className="usrm-header">
        <h2 className="usrm-title">Users Management</h2>
        <button className="usrm-add-btn" onClick={() => setAddUser({})}>
          <HiOutlinePlusCircle /> Add User
        </button>
      </div>

      <div className="usrm-table-card">
        {loading ? (
          <p className="usrm-loading">Loading users...</p>
        ) : (
          <table className="usrm-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user, index) => (
                <tr key={user.id} className="usrm-row">
                  <td>{index + 1}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`usrm-role usrm-${user.role}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="usrm-actions">
                    <HiOutlineEye onClick={() => setViewUser(user)} />
                    <HiOutlinePencilSquare onClick={() => setEditUser(user)} />
                    <HiOutlineTrash onClick={() => handleDelete(user.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* VIEW MODAL */}
      {viewUser && (
        <div className="usrm-modal-overlay">
          <div className="usrm-modal usrm-animate">
            <h3>User Details</h3>
            <p>
              <b>Name:</b> {viewUser.name}
            </p>
            <p>
              <b>Email:</b> {viewUser.email}
            </p>
            <p>
              <b>Role:</b> {viewUser.role}
            </p>
            <button
              className="usrm-modal-close"
              onClick={() => setViewUser(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ADD MODAL */}
      {addUser && (
        <div className="usrm-modal-overlay">
          <div className="usrm-modal usrm-animate">
            <h3>Add User</h3>

            <input
              placeholder="Name"
              onChange={(e) => setAddUser({ ...addUser, name: e.target.value })}
            />

            <input
              placeholder="Email"
              onChange={(e) =>
                setAddUser({ ...addUser, email: e.target.value })
              }
            />

            <input
              placeholder="Password"
              type="password"
              onChange={(e) =>
                setAddUser({ ...addUser, password: e.target.value })
              }
            />

            <select
              onChange={(e) => setAddUser({ ...addUser, role: e.target.value })}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <div className="usrm-modal-actions">
              <button className="usrm-btn-primary" onClick={handleAdd}>
                Save
              </button>
              <button
                className="usrm-btn-danger"
                onClick={() => setAddUser(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* UPDATE MODAL */}
      {editUser && (
        <div className="usrm-modal-overlay">
          <div className="usrm-modal usrm-animate">
            <h3>Update User</h3>

            <input
              value={editUser.name}
              onChange={(e) =>
                setEditUser({ ...editUser, name: e.target.value })
              }
            />

            <input
              value={editUser.email}
              onChange={(e) =>
                setEditUser({ ...editUser, email: e.target.value })
              }
            />

            <select
              value={editUser.role}
              onChange={(e) =>
                setEditUser({ ...editUser, role: e.target.value })
              }
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <div className="usrm-modal-actions">
              <button className="usrm-btn-primary" onClick={handleUpdate}>
                Update
              </button>
              <button
                className="usrm-btn-danger"
                onClick={() => setEditUser(null)}
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

export default Users;
