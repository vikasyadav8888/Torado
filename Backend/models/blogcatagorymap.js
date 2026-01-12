import pool from "../config/db.js";


const blogCategoryMapModel = {
  async create(data) {
    const { blog_id, category_id, created_by = null } = data;
    await pool.query("CALL sp_blog_category_map_create(?,?,?)", [blog_id, category_id, created_by]);
  },

  async getAll() {
    const [rows] = await pool.query("CALL sp_blog_category_map_get_all()");
    return rows[0];
  },

  async getById(id) {
    const [rows] = await pool.query("CALL sp_blog_category_map_get_by_id(?)", [id]);
    return rows[0][0];
  },

  async update(id, data) {
    const { blog_id, category_id, updated_by = null } = data;
    await pool.query("CALL sp_blog_category_map_update(?,?,?,?)", [id, blog_id, category_id, updated_by]);
  },

  async hardDelete(id) {
    await pool.query("CALL sp_blog_category_map_hard_delete(?)", [id]);
  },
};

export default blogCategoryMapModel;
