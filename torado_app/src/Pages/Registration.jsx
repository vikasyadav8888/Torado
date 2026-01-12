import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // 🔹 useNavigate add
import axios from "axios";

function Register() {
  const navigate = useNavigate(); // 🔹 navigation hook

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const submit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/api/users/register", data);

      alert("Account Created Successfully");

      // 🔹 signup ke baad login page redirect
      navigate("/login");

    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-bg">
      <form className="auth-box fade-in" onSubmit={submit}>
        <h2>Create Account</h2>

        <div className="input-group">
          <input
            type="text"
            required
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          <label>Full Name</label>
        </div>

        <div className="input-group">
          <input
            type="email"
            required
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <label>Email</label>
        </div>

        <div className="input-group">
          <input
            type="password"
            required
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <label>Password</label>
        </div>

        <div className="input-group">
          <select
            className="role-select"
            value={data.role}
            onChange={(e) => setData({ ...data, role: e.target.value })}
            required
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <label>User Role</label>
        </div>

        <button className="auth-btn">Sign Up</button>

        <p className="auth-switch">
          Already have an account?
          <Link to="/login"> Sign In</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
