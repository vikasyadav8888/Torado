import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  HiOutlineEye,
  HiOutlineTrash,
  HiOutlinePlusCircle,
  HiOutlinePencilSquare,
} from "react-icons/hi2";

const API = "http://localhost:8000/api/faqs";

const Faqadmin = () => {
  const [faqList, setFaqList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const [viewFaq, setViewFaq] = useState(null);
  const [editFaq, setEditFaq] = useState(null);
  const [addFaq, setAddFaq] = useState(null);

  const token = localStorage.getItem("token");

  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const fetchFaqs = async () => {
    const res = await axios.get(`${API}/`, authHeader);
    setFaqList(res.data);
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleAddFaq = async () => {
    await axios.post(API, addFaq, authHeader);
    setAddFaq(null);
    fetchFaqs();
  };

  const handleUpdateFaq = async () => {
    await axios.put(`${API}/update/${editFaq.id}`, editFaq, authHeader);
    setEditFaq(null);
    fetchFaqs();
  };

  const handleDeleteFaq = async (id) => {
    if (!window.confirm("Delete this FAQ?")) return;
    await axios.delete(`${API}/delete/${id}`, authHeader);
    fetchFaqs();
  };

  const totalPages = Math.ceil(faqList.length / pageSize);
  const visibleFaqs = faqList.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="fqm-wrapper">
      <div className="fqm-header">
        <h2 className="fqm-title">FAQ Management</h2>
        <button
          className="fqm-add-btn"
          onClick={() => setAddFaq({ question: "", answer: "" })}
        >
          <HiOutlinePlusCircle /> Add FAQ
        </button>
      </div>

      <div className="fqm-table-box">
        <table className="fqm-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Question</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {visibleFaqs.map((faq, index) => (
              <tr key={faq.id}>
                <td>{index + 1}</td>
                <td>{faq.question}</td>
                <td>
                  <span className="fqm-status">
                    {faq.status === 1 ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="fqm-actions">
                  <HiOutlineEye onClick={() => setViewFaq(faq)} />
                  <HiOutlinePencilSquare onClick={() => setEditFaq(faq)} />
                  <HiOutlineTrash onClick={() => handleDeleteFaq(faq.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="fqm-pagination">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`fqm-page-btn ${
              currentPage === i + 1 ? "active" : ""
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {viewFaq && (
        <div className="fqm-modal-overlay">
          <div className="fqm-modal">
            <h3>{viewFaq.question}</h3>
            <p>{viewFaq.answer}</p>
            <button
              className="fqm-close-btn"
              onClick={() => setViewFaq(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {addFaq && (
        <div className="fqm-modal-overlay">
          <div className="fqm-modal">
            <h3>Add FAQ</h3>
            <input
              placeholder="Question"
              onChange={(e) =>
                setAddFaq({ ...addFaq, question: e.target.value })
              }
            />
            <textarea
              placeholder="Answer"
              onChange={(e) =>
                setAddFaq({ ...addFaq, answer: e.target.value })
              }
            />
            <div className="fqm-modal-actions">
              <button onClick={handleAddFaq}>Save</button>
              <button onClick={() => setAddFaq(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {editFaq && (
        <div className="fqm-modal-overlay">
          <div className="fqm-modal">
            <h3>Update FAQ</h3>
            <input
              value={editFaq.question}
              onChange={(e) =>
                setEditFaq({ ...editFaq, question: e.target.value })
              }
            />
            <textarea
              value={editFaq.answer}
              onChange={(e) =>
                setEditFaq({ ...editFaq, answer: e.target.value })
              }
            />
            <div className="fqm-modal-actions">
              <button onClick={handleUpdateFaq}>Update</button>
              <button onClick={() => setEditFaq(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Faqadmin;
