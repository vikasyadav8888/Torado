import pool from "../config/db.js";

const faqModel = {
  async create(data) {
    const { question, answer, created_by = null } = data;

    await pool.query("CALL sp_faq_create(?,?,?)", [
      question,
      answer,
      created_by,
    ]);
  },
  async getAll() {
    const [rows] = await pool.query("CALL sp_faq_get_all()");
    return rows[0];
  },

  async getById(id) {
    const [rows] = await pool.query("CALL sp_faq_get_by_id(?)", [id]);
    return rows[0][0];
  },

   async update(id, data) {
    const { question, answer, updated_by = null } = data;

    await pool.query(
      "CALL sp_faq_update(?,?,?,?)",
      [id, question, answer, updated_by]
    );
  },

  async hardDelete(id) {
    await pool.query(
      "CALL sp_faq_hard_delete(?)",
      [id]
    );
  }
};


export default faqModel;