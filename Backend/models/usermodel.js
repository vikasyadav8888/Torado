import pool from "../config/db.js";

const userModel = {
  async create(data) {
    const {
      name,
      email,
      password,
      role = "user",
      status = 1,
      created_by = null,
    } = data;
    await pool.query("CALL sp_user_create(?,?,?,?,?,?)", [
      name,
      email,
      password,
      role,
      status,
      created_by,
    ]);
  },

  async getAll(id) {
    const [rows] = await pool.query("CALL sp_user_get_all()");
    return rows[0];
  },

  async getById(id) {
    const [rows] = await pool.query("CALL sp_user_get_by_id(?)", [id]);
    return rows[0][0];
  },

  async update(id, data) {
    const { name, role, status, updated_by = null } = data;

    await pool.query("CALL sp_user_update(?,?,?,?,?)", [
      id,
      name,
      role,
      status,
      updated_by,
    ]);
  },

  async hardDelete(id) {
    await pool.query("CALL sp_user_hard_delete(?)", [id]);
  },
};

export default userModel;