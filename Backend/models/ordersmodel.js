import pool from "../config/db.js";

const OrderModel = {
  async create(data) {
    const [result] = await pool.query(
      "CALL sp_create_order(?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        data.user_id,      
        data.name,
        data.email,
        data.phone,
        data.address,
        data.city,
        data.state,
        data.zip,
        data.total,
        data.payment_method,
        data.transaction_id,
        data.created_by,
      ]
    );
    return result[0][0];
  },

  async createOrderItem(item) {
    await pool.query("CALL sp_create_order_item(?,?,?,?,?,?)", [
      item.order_id,
      item.product_id,
      item.title,
      item.price,
      item.qty,
      item.created_by,
    ]);
  },

  async getAll() {
    const [rows] = await pool.query("CALL sp_get_all_orders()");
    return rows[0];
  },

  async getById(id) {
    const [result] = await pool.query("CALL sp_get_order_by_id(?)", [id]);
    return {
      order: result[0][0],
      items: result[1],
    };
  },

  async update(data) {
    await pool.query("CALL sp_update_order(?,?,?,?,?,?,?,?,?,?)", [
      data.id,
      data.name,
      data.phone,
      data.address,
      data.city,
      data.state,
      data.zip,
      data.payment_status,
      data.order_status,
      data.updated_by,
    ]);
  },

  async getByUser(userId) {
  const [rows] = await pool.query(
    "CALL sp_get_orders_by_user(?)",
    [userId]
  );
  return rows[0];
},

  async delete(id) {
    await pool.query("CALL sp_delete_order(?)", [id]);
  },
};

export default OrderModel;
