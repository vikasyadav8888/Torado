import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ onClose, onSuccess }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:8000/api/users/login",
        data
      );

      const { token, user } = res.data;

      // ✅ Save token & user
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // callback success
      if (onSuccess) {
        onSuccess(user);
      }

      // close modal
      if (onClose) {
        onClose();
      }

      // 🔥 ROLE BASED REDIRECT
      if (user.role === "admin") {
        navigate("/main"); 
      } else {
        navigate("/"); 
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-bg">
      <form className="auth-box slide-in" onSubmit={submit}>
        
        {onClose && (
          <span className="auth-close" onClick={onClose}>
            ×
          </span>
        )}

        <h2>Welcome Back</h2>

        {/* Error */}
        {error && <p className="auth-error">{error}</p>}

        {/* Email */}
        <div className="input-group">
          <input
            type="email"
            placeholder=" "
            required
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <label>Email</label>
        </div>

        {/* Password */}
        <div className="input-group">
          <input
            type="password"
            placeholder=" "
            required
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <label>Password</label>
        </div>

        {/* Button */}
        <button className="auth-btn" disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </button>

        {/* Switch */}
        <p className="auth-switch">
          Don’t have an account?
          <Link to="/register"> Create one</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
