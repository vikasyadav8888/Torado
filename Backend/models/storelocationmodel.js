import pool from "../config/db.js";


const storeLocationModel = {
     async create(data) {
    const {
      store_name,
      address,
      hours,
      mobile,
      created_by = null,
    } = data;

    await pool.query(
      "CALL sp_store_create(?,?,?,?,?)",
      [store_name, address, hours, mobile, created_by]
    );
  },

  async getAll() {
    const [rows] = await pool.query(
      "CALL sp_store_get_all()"
    );
    return rows[0];
  },

  async getById(id) {
    const [rows] = await pool.query(
      "CALL sp_store_get_by_id(?)",
      [id]
    );
    return rows[0][0];
  },

  async update(id, data) {
    const {
      store_name,
      address,
      hours,
      mobile,
      updated_by = null,
    } = data;

    await pool.query(
      "CALL sp_store_update(?,?,?,?,?,?)",
      [id, store_name, address, hours, mobile, updated_by]
    );
  },

  async hardDelete(id) {
    await pool.query(
      "CALL sp_store_hard_delete(?)",
      [id]
    );
  },

};


export default storeLocationModel;