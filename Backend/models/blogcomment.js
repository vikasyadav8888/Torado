import pool from "../config/db.js";

const blogCommentModel = {
  async create(data) {
    const { blog_id, name, email, comment, save_info = 0, status = 1 } = data;
    await pool.query("CALL sp_blog_comment_create(?,?,?,?,?,?)", [
      blog_id,
      name,
      email,
      comment,
      save_info,
      status,
    ]);
  },

  async getAll() {
    const [rows] = await pool.query("CALL sp_blog_comment_get_all()");
    return rows[0];
  },

  async getById(id) {
    const [rows] = await pool.query("CALL sp_blog_comment_get_by_id(?)", [id]);
    return rows[0][0];
  },

  async update(id, data) {
    const { name, email, comment, save_info, status } = data;
    await pool.query("CALL sp_blog_comment_update(?,?,?,?,?,?)", [
      id,
      name,
      email,
      comment,
      save_info,
      status,
    ]);
  },

  async hardDelete(id) {
    await pool.query("CALL sp_blog_comment_hard_delete(?)", [id]);
  },
};

export default blogCommentModel;
