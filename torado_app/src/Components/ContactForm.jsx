import React, { useState, useEffect } from "react";
import axios from "axios";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    agree: false,
  });

  const [user, setUser] = useState(null);  
  const [loading, setLoading] = useState(false);

  // Autofill logged-in user info
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setFormData((prev) => ({
        ...prev,
        name: parsedUser.name || "",
        email: parsedUser.email || "",
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agree) {
      alert("Please accept terms & conditions");
      return;
    }

    if (!user) {
      alert("You must be logged in to submit a contact message");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:8000/api/contact_form/contact",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: "",
        subject: "",
        message: "",
        agree: false,
      });
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cf-wrapper">
      <h2>Leave A Message</h2>

      {!user && (
        <p style={{ color: "red", marginBottom: "15px" }}>
          Please login to submit a contact message.
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="cf-row">
          <input
            type="text"
            name="name"
            placeholder="Name*"
            required
            value={formData.name}
            onChange={handleChange}
            disabled={!!user} 
          />

          <input
            type="email"
            name="email"
            placeholder="Email*"
            required
            value={formData.email}
            onChange={handleChange}
            disabled={!!user} 
          />
        </div>

        <div className="cf-row">
          <input
            type="text"
            name="phone"
            placeholder="Phone Number*"
            required
            value={formData.phone}
            onChange={handleChange}
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject*"
            required
            value={formData.subject}
            onChange={handleChange}
          />
        </div>

        <textarea
          name="message"
          placeholder="Your Message..."
          required
          value={formData.message}
          onChange={handleChange}
        ></textarea>

        <label className="cf-checkbox">
          <input
            type="checkbox"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
          />
          I agree to the <span>terms & conditions</span> and{" "}
          <span>privacy policy</span>
        </label>

        <button type="submit" disabled={loading || !user}>
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
