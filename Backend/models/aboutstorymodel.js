import pool from "../config/db.js";

const aboutStoryModel = {
  async create(data) {
    const {
      title,
      description1,
      description2,
      quote,
      founder_name,
      founder_role,
      image,
      created_by = null,
    } = data;

    await pool.query("CALL sp_about_create(?,?,?,?,?,?,?,?)", [
      title,
      description1,
      description2,
      quote,
      founder_name,
      founder_role,
      image,
      created_by,
    ]);
  },
  async getAll() {
    const [rows] = await pool.query("CALL sp_about_get_all()");
    return rows[0];
  },
  async getById(id) {
    const [rows] = await pool.query("CALL sp_about_get_by_id(?)", [id]);
    return rows[0][0];
  },
  async update(id, data) {
    const {
      title,
      description1,
      description2,
      quote,
      founder_name,
      founder_role,
      image,
      updated_by = null,
    } = data;

    await pool.query("CALL sp_about_update(?,?,?,?,?,?,?,?,?)", [
      id,
      title,
      description1,
      description2,
      quote,
      founder_name,
      founder_role,
      image,
      updated_by,
    ]);
  },
  async hardDelete(id) {
    await pool.query("CALL sp_about_hard_delete(?)", [id]);
  },
};

export default aboutStoryModel;