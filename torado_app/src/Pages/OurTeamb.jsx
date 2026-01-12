import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  HiOutlineEye,
  HiOutlineTrash,
  HiOutlinePlusCircle,
  HiOutlinePencilSquare,
} from "react-icons/hi2";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaPinterestP,
} from "react-icons/fa";

const API = "http://localhost:8000/api/team";

const Team = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 6;

  const [viewMember, setViewMember] = useState(null);
  const [editMember, setEditMember] = useState(null);
  const [addMember, setAddMember] = useState(false);

  const token = localStorage.getItem("token");

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchTeam = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API, authHeader);
      setTeam(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAdd = async () => {
    await axios.post(`${API}/create`, addMember, authHeader);
    setAddMember(false);
    fetchTeam();
  };

  const handleUpdate = async () => {
    await axios.put(`${API}/update/${editMember.id}`, editMember, authHeader);
    setEditMember(null);
    fetchTeam();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this member?")) return;
    await axios.delete(`${API}/delete/${id}`, authHeader);
    fetchTeam();
  };

  const totalPages = Math.ceil(team.length / limit);
  const paginatedTeam = team.slice((page - 1) * limit, page * limit);

  return (
    <div className="usrm-wrapper">
      {/* HEADER */}
      <div className="usrm-header">
        <h2 className="usrm-title">Team Management</h2>
        <button className="usrm-add-btn" onClick={() => setAddMember({})}>
          <HiOutlinePlusCircle /> Add Member
        </button>
      </div>

      {/* TABLE */}
      <div className="usrm-table-card">
        {loading ? (
          <p className="usrm-loading">Loading team...</p>
        ) : (
          <table className="usrm-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {paginatedTeam.map((m, index) => (
                <tr key={m.id} className="usrm-row">
                  <td>{(page - 1) * limit + index + 1}</td>
                  <td className="team-name">
                    <img src={m.image} alt={m.name} />
                    {m.name}
                  </td>
                  <td>{m.role}</td>
                  <td>
                    <span className={`team-status ${m.status ? "active" : ""}`}>
                      {m.status ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="usrm-actions">
                    <HiOutlineEye onClick={() => setViewMember(m)} />
                    <HiOutlinePencilSquare onClick={() => setEditMember(m)} />
                    <HiOutlineTrash onClick={() => handleDelete(m.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="usrm-pagination">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={page === i + 1 ? "active" : ""}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* VIEW MODAL */}
      {viewMember && (
        <div className="usrm-modal-overlay">
          <div className="usrm-modal usrm-animate">
            <h3>Team Member Details</h3>

            {/* Image */}
            {viewMember.image && (
              <img
                src={viewMember.image}
                alt={viewMember.name}
                className="usrm-view-image"
              />
            )}

            {/* Basic Info */}
            <p>
              <b>Name:</b> {viewMember.name}
            </p>
            <p>
              <b>Role:</b> {viewMember.role}
            </p>
            <p>
              <b>Status:</b>{" "}
              <span
                className={`usrm-status usrm-${
                  viewMember.status ? "active" : "inactive"
                }`}
              >
                {viewMember.status ? "Active" : "Inactive"}
              </span>
            </p>

            {/* SOCIAL ICONS */}
            <div className="usrm-socials">
              {viewMember.facebook && (
                <a href={viewMember.facebook} target="_blank" rel="noreferrer">
                  <FaFacebookF />
                </a>
              )}

              {viewMember.twitter && (
                <a href={viewMember.twitter} target="_blank" rel="noreferrer">
                  <FaTwitter />
                </a>
              )}

              {viewMember.linkedin && (
                <a href={viewMember.linkedin} target="_blank" rel="noreferrer">
                  <FaLinkedinIn />
                </a>
              )}

              {viewMember.pinterest && (
                <a href={viewMember.pinterest} target="_blank" rel="noreferrer">
                  <FaPinterestP />
                </a>
              )}
            </div>

            {/* Close */}
            <button
              className="usrm-btn-danger"
              onClick={() => setViewMember(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ADD MODAL */}
      {addMember && (
        <div className="usrm-modal-overlay">
          <div className="usrm-modal usrm-animate">
            <h3>Add Team Member</h3>

            <input
              placeholder="Name"
              onChange={(e) =>
                setAddMember({ ...addMember, name: e.target.value })
              }
            />
            <input
              placeholder="Role"
              onChange={(e) =>
                setAddMember({ ...addMember, role: e.target.value })
              }
            />
            <input
              placeholder="Image URL"
              onChange={(e) =>
                setAddMember({ ...addMember, image: e.target.value })
              }
            />
            <input
              placeholder="Facebook"
              onChange={(e) =>
                setAddMember({ ...addMember, facebook: e.target.value })
              }
            />
            <input
              placeholder="Twitter"
              onChange={(e) =>
                setAddMember({ ...addMember, twitter: e.target.value })
              }
            />
            <input
              placeholder="LinkedIn"
              onChange={(e) =>
                setAddMember({ ...addMember, linkedin: e.target.value })
              }
            />
            <input
              placeholder="Pinterest"
              onChange={(e) =>
                setAddMember({ ...addMember, pinterest: e.target.value })
              }
            />

            <div className="usrm-modal-actions">
              <button className="usrm-btn-primary" onClick={handleAdd}>
                Save
              </button>
              <button
                className="usrm-btn-danger"
                onClick={() => setAddMember(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editMember && (
        <div className="usrm-modal-overlay">
          <div className="usrm-modal usrm-animate">
            <h3>Edit Member</h3>

            <input
              value={editMember.name}
              onChange={(e) =>
                setEditMember({ ...editMember, name: e.target.value })
              }
            />
            <input
              value={editMember.role}
              onChange={(e) =>
                setEditMember({ ...editMember, role: e.target.value })
              }
            />
            <input
              value={editMember.image}
              onChange={(e) =>
                setEditMember({ ...editMember, image: e.target.value })
              }
            />

            <div className="usrm-modal-actions">
              <button className="usrm-btn-primary" onClick={handleUpdate}>
                Update
              </button>
              <button
                className="usrm-btn-danger"
                onClick={() => setEditMember(null)}
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

export default Team;
