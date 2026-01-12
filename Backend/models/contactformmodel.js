import pool from "../config/db.js";

const contactModel = {
  async create(data) {
    const { name, email, phone, subject, message, created_by } = data;
    await pool.query("CALL sp_contact_create(?,?,?,?,?,?)", [
      name,
      email,
      phone,
      subject,
      message,
      created_by,
    ]);
  },

  async getAll() {
    const [rows] = await pool.query("CALL sp_contact_get_all()");
    return rows[0];
  },

  async getById(id) {
    const [rows] = await pool.query("CALL sp_contact_get_by_id(?)", [id]);
    return rows[0][0];
  },

  async hardDelete(id) {
    await pool.query("CALL sp_contact_hard_delete(?)", [id]);
  },
};

export default contactModel;
