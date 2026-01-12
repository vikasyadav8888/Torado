import pool from "../config/db.js";

const blogPreSaleModel = {
  async create(data) {
    const {
      blog_id,
      title,
      requirement,
      image1,
      image2,
      status = 1,
      created_by = null
    } = data;

    await pool.query(
      "CALL sp_blog_pre_sale_create(?,?,?,?,?,?,?)",
      [
        blog_id,
        title,
        JSON.stringify(requirement), // 🔥 IMPORTANT
        image1,
        image2,
        status,
        created_by
      ]
    );
  },

  async getAll() {
    const [rows] = await pool.query("CALL sp_blog_pre_sale_get_all()");
    return rows[0];
  },

  async getById(id) {
    const [rows] = await pool.query("CALL sp_blog_pre_sale_get_by_id(?)", [id]);
    return rows[0][0];
  },

  async update(id, data) {
    const {
      title,
      requirement,
      image1,
      image2,
      status,
      updated_by = null
    } = data;

    await pool.query(
      "CALL sp_blog_pre_sale_update(?,?,?,?,?,?,?)",
      [
        id,
        title,
        JSON.stringify(requirement), // 🔥 IMPORTANT
        image1,
        image2,
        status,
        updated_by
      ]
    );
  },

  async hardDelete(id) {
    await pool.query("CALL sp_blog_pre_sale_hard_delete(?)", [id]);
  }
};

export default blogPreSaleModel;
