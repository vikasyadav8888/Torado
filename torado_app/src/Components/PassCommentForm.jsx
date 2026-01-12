import React, { useState } from "react";


const PassCommentForm = ({ blogId }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
    saveInfo: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8000/api/blogcomment/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            blog_id: blogId,
            name: formData.name,
            email: formData.email,
            comment: formData.comment,
            save_info: formData.saveInfo,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Comment posted successfully ");
        setFormData({
          name: "",
          email: "",
          comment: "",
          saveInfo: false,
        });
      } else {
        alert(result.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error");
    }
  };

  return (
    <div className="comment-section">
      <h2 className="comment-title">Leave A Comment</h2>
      <p className="comment-subtitle">
        Your email address will not be published. Required fields are marked.
      </p>

      <form className="comment-form" onSubmit={handleSubmit}>
        <div className="comment-row">
          <input
            type="text"
            name="name"
            placeholder="Name*"
            required
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address*"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <textarea
          name="comment"
          placeholder="Your Comment Here"
          required
          value={formData.comment}
          onChange={handleChange}
        ></textarea>

        <label className="save-info">
          <input
            type="checkbox"
            name="saveInfo"
            checked={formData.saveInfo}
            onChange={handleChange}
          />
          Save my info for the next time I comment.
        </label>

        <button type="submit" className="submit-btn">
          Post A Comment
        </button>
      </form>
    </div>
  );
};

export default PassCommentForm;
