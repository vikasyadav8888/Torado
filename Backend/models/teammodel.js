import pool from "../config/db.js";


const teamModel = {
  async create(data) {
    const {
      name,
      role,
      image,
      facebook,
      twitter,
      linkedin,
      pinterest,
      created_by = null,
    } = data;

    await pool.query("CALL sp_team_create(?,?,?,?,?,?,?,?)", [
      name,
      role,
      image,
      facebook,
      twitter,
      linkedin,
      pinterest,
      created_by,
    ]);
  },

  async getAll() {
    const [rows] = await pool.query("CALL sp_team_get_all()");
    return rows[0];
  },

  async getById(id) {
    const [rows] = await pool.query("CALL sp_team_get_by_id(?)", [id]);
    return rows[0][0];
  },

  async update(id, data) {
    const {
      name,
      role,
      image,
      facebook,
      twitter,
      linkedin,
      pinterest,
      updated_by = null,
    } = data;

    await pool.query("CALL sp_team_update(?,?,?,?,?,?,?,?,?)", [
      id,
      name,
      role,
      image,
      facebook,
      twitter,
      linkedin,
      pinterest,
      updated_by,
    ]);
  },

  async hardDelete(id) {
    await pool.query("CALL sp_team_hard_delete(?)", [id]);
  },
};

export default teamModel;
