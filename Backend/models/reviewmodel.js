import pool from "../config/db.js";

const reviewModel = {
  async create(data) {
    const { product_id, name, email, website, comment, rating, created_by } =
      data;

    await pool.query("CALL sp_review_create(?,?,?,?,?,?,?)", [
      product_id,
      name,
      email,
      website,
      comment,
      rating,
      created_by,
    ]);
  },
  async getAll() {
    const [result] = await pool.query("CALL sp_get_all_reviews()");
    return result[0] ?? []; 
  },

  async hardDelete(data) {
    const { id, product_id } = data;

    await pool.query("CALL sp_review_hard_delete(?,?)", [id, product_id]);
  },
};

export default reviewModel;
