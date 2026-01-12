import pool from "../config/db.js";

const blogAfterSaleModel = {
  async create(data) {
    const {
      blog_id,
      title,
      short_paragraph_1,
      checked_list,
      paragraph_after_1,
      status = 1,
      created_by = null
    } = data;

    await pool.query(
      "CALL sp_blog_after_sale_create(?,?,?,?,?,?,?)",
      [
        blog_id,
        title,
        short_paragraph_1,
        JSON.stringify(checked_list), // 🔥 IMPORTANT
        paragraph_after_1,
        status,
        created_by
      ]
    );
  },

  async getAll() {
    const [rows] = await pool.query("CALL sp_blog_after_sale_get_all()");
    return rows[0];
  },

  async getById(id) {
    const [rows] = await pool.query("CALL sp_blog_after_sale_get_by_id(?)", [id]);
    return rows[0][0];
  },

  async update(id, data) {
    const {
      title,
      short_paragraph_1,
      checked_list,
      paragraph_after_1,
      status,
      updated_by = null
    } = data;

    await pool.query(
      "CALL sp_blog_after_sale_update(?,?,?,?,?,?,?,)",
      [
        id,
        title,
        short_paragraph_1,
        JSON.stringify(checked_list),
        paragraph_after_1,
        status,
        updated_by
      ]
    );
  },

  async hardDelete(id) {
    await pool.query("CALL sp_blog_after_sale_hard_delete(?)", [id]);
  }
};

export default blogAfterSaleModel;
