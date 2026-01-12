import bcrypt from "bcrypt";
import pool from "../config/db.js";


export const createDefaultAdmin = async () => {
  try {
    const email = "admin@gmail.com";

   
    const [rows] = await pool.query(
      "SELECT * FROM tbl_users WHERE email = ? AND status = 1",
      [email]
    );

    if (rows.length > 0) {
      console.log("Admin already exists");
      return;
    }

    const hash = await bcrypt.hash("admin123", 10);

    await pool.query(
      `INSERT INTO tbl_users (name, email, password, status, created_by)
       VALUES (?, ?, ?, ?, ?)`,
      ["Admin", email, hash, 1, null]
    );

    console.log("Default Admin Created Successfully!");
  } catch (err) {
    console.error("Error creating admin:", err.message);
  }
};
