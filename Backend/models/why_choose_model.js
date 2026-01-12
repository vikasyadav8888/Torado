import pool from "../config/db.js";


const whychooseUsModel = {
   async create(data) {
        const{title , subtitle , icon , created_by} = data;
        await pool.query("CALL sp_wcu_create(?,?,?,?)",[
            title,
            subtitle, 
            icon ,
            created_by
        ]);
    },
   
    async getAll() {
      const [rows] = await pool.query("CALL sp_wcu_get_all()");
      return rows[0]
    },

    async update(id, data) {
    const { title, subtitle, icon, updated_by } = data;

    await pool.query("CALL sp_wcu_update(?,?,?,?,?)", [
      id,
      title,
      subtitle,
      icon,
      updated_by,
    ]);
  },

  async hardDelete(id) {
    await pool.query("CALL sp_wcu_hard_delete(?)", [id]);
  },

};

export default whychooseUsModel;