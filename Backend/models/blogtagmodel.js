import pool from "../config/db.js";


const blogTagModel = {
  async create(data) {
    const { name, status = 1, created_by = null } = data;
    await pool.query("CALL sp_blog_tag_create(?,?,?)", [name, status, created_by]);
  },

  async getAll() {
    const [rows] = await pool.query("CALL sp_blog_tag_get_all()");
    return rows[0];
  },

  async getById(id) {
    const [rows] = await pool.query("CALL sp_blog_tag_get_by_id(?)", [id]);
    return rows[0][0];
  },

  async update(id, data) {
    const { name, status, updated_by = null } = data;
    await pool.query("CALL sp_blog_tag_update(?,?,?,?)", [id, name, status, updated_by]);
  },

  async hardDelete(id) {
    await pool.query("CALL sp_blog_tag_hard_delete(?)", [id]);
  },
};

export default blogTagModel;
