import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/usermodel.js";
import dotenv from "dotenv";
dotenv.config();

const userController = {
  async register(req, res) {
    try {
      const { name, email, password, role } = req.body;
      if (!name || !email || !password)
        return res.status(400).json({ message: "All fiels required" });
      const hash = await bcrypt.hash(password, 10);
      await userModel.create({
        name,
        email,
        password: hash,
        role,
        created_by: null,
      });
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({
        message: "Register failed",
        error: error.message,
      });
    }
  },
async login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const users = await userModel.getAll();

    const user = users.find(
      (u) => u.email === email && u.status === 1
    );

    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    if (!user.password)
      return res.status(500).json({ message: "Password missing in DB result" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
},


  async getAll(req, res) {
    try {
      const data = await userModel.getAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: "Fetch failed", error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const data = await userModel.getById(req.params.id);
      if (!data) return res.status(404).json({ message: "User not found" });
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: "Fetch failed", error: err.message });
    }
  },

  async update(req, res) {
    try {
      await userModel.update(req.params.id, {
        ...req.body,
        updated_by: req.user.id,
      });
      res.json({ message: "User updated successfully" });
    } catch (err) {
      res.status(500).json({ message: "Update failed", error: err.message });
    }
  },

  async hardDelete(req, res) {
    try {
      await userModel.hardDelete(req.params.id);
      res.json({ message: "User deleted permanently" });
    } catch (err) {
      res.status(500).json({ message: "Delete failed", error: err.message });
    }
  },
};

export default userController;
