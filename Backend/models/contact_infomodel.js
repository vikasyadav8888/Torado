import pool from "../config/db.js";


const contactInfoModel = {
  async create(data) {
    const { type, title, value_1, value_2, created_by } = data;
    await pool.query("CALL sp_contact_info_create(?,?,?,?,?)", [
      type,
      title,
      value_1,
      value_2,
      created_by,
    ]);
  },

  async getAll() {
    const [rows] = await pool.query("CALL sp_contact_info_get_all()");
    return rows[0];
  },

  async getByType(type) {
    const [rows] = await pool.query(
      "CALL sp_contact_info_get_by_type(?)",
      [type]
    );
    return rows[0];
  },

  async update(id, data) {
    const { title, value_1, value_2, updated_by } = data;
    await pool.query("CALL sp_contact_info_update(?,?,?,?,?)", [
      id,
      title,
      value_1,
      value_2,
      updated_by,
    ]);
  },

  async hardDelete(id) {
    await pool.query("CALL sp_contact_info_hard_delete(?)", [id]);
  },
};

export default contactInfoModel;
