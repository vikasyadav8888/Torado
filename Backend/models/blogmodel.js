import pool from "../config/db.js";

const blogModel = {
  async create(data) {
    const {
      main_image,
      title,
      blog_date,
      heading,
      quote,
      created_by = null,
    } = data;
    await pool.query("CALL sp_blog_create(?,?,?,?,?,?)", [
      main_image,
      title,
      blog_date,
      heading,
      quote,
      created_by,
    ]);
  },

  async getAll() {
    const [rows] = await pool.query("CALL sp_blog_get_all()");
    return rows[0];
  },

  async getById(id) {
  const [rows] = await pool.query("CALL sp_blog_detail_by_id(?)", [id]);

  return {
    blog: rows[0][0],
    categories: rows[1],
    tags: rows[2],
    paragraphs: rows[3],
    pre_sale: rows[4],
    after_sale: rows[5],
    comments: rows[6],
  };
}
,

  async update(id, data) {
    const {title,status,updated_by = null } = data;
    await pool.query("CALL sp_blog_update(?,?,?,?)", [
      id,
      title,
      status,
      updated_by,
    ]);
  },

  async hardDelete(id) {
    await pool.query("CALL sp_blog_hard_delete(?)", [id]);
  },
};

export default blogModel;
