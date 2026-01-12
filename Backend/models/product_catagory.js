import pool from "../config/db.js";


const categoryModel = {
  async create(data) {
    const { name, slug, created_by } = data;
    await pool.query("CALL sp_category_create(?,?,?)", [
      name,
      slug,
      created_by,
    ]);
  },

  async getAll() {
    const [rows] = await pool.query("CALL sp_category_get_all()");
    return rows[0];
  },

  async hardDelete(id) {
    await pool.query("CALL sp_category_hard_delete(?)", [id]);
  },
};

export default categoryModel;
