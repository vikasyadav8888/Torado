import pool from "../config/db.js";

const productModel = {
  async create(data) {
    const {
      title,
      image,
      short_description,
      long_description,
      price,
      old_price,
      category_id,
      tags,

      tag,       
      tag_type,   

      brand,
      color,
      size,
      weight,
      dimensions,
      created_by,
    } = data;

    await pool.query(
      "CALL sp_product_create(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        title,
        image,
        short_description,
        long_description,
        price,
        old_price,
        category_id,
        tags,

        tag,        
        tag_type,   

        brand,
        color,
        size,
        weight,
        dimensions,
        created_by,
      ]
    );
  },

  async getAll() {
    const [rows] = await pool.query("CALL sp_product_get_all()");
    return rows[0];
  },

  async getById(id) {
    const [rows] = await pool.query("CALL sp_product_get_by_id(?)", [id]);
    return {
      product: rows[0][0],
      reviews: rows[1],
    };
  },

  async update(data) {
    const {
      id,
      title,
      image,
      price,
      old_price,
      category_id,
      tags,

      tag,      
      tag_type,  

      status,
      updated_by,
    } = data;

    await pool.query(
      "CALL sp_product_update(?,?,?,?,?,?,?,?,?,?,?)",
      [
        id,
        title,
        image,
        price,
        old_price,
        category_id,
        tags,

        tag,       
        tag_type, 

        status,
        updated_by,
      ]
    );
  },

  async hardDelete(id) {
    await pool.query("CALL sp_product_hard_delete(?)", [id]);
  },
};

export default productModel;
