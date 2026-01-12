import pool from "../config/db.js";

const blogParagraphModel = {
  async create(data) {
    const { blog_id, paragraph_order, content, status = 1, created_by = null } = data;
    await pool.query("CALL sp_blog_paragraph_create(?,?,?,?,?)", [
      blog_id,
      paragraph_order,
      content,
      status,
      created_by,
    ]);
  },

  async getAll() {
    const [rows] = await pool.query("CALL sp_blog_paragraph_get_all()");
    return rows[0];
  },

  async getById(id) {
    const [rows] = await pool.query("CALL sp_blog_paragraph_get_by_id(?)", [id]);
    return rows[0][0];
  },

  async update(id, data) {
    const { paragraph_order, content, status, updated_by = null } = data;
    await pool.query("CALL sp_blog_paragraph_update(?,?,?,?,?)", [
      id,
      paragraph_order,
      content,
      status,
      updated_by,
    ]);
  },

  async hardDelete(id) {
    await pool.query("CALL sp_blog_paragraph_hard_delete(?)", [id]);
  },
};

export default blogParagraphModel;
