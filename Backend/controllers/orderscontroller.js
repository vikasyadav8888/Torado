import OrderModel from "../models/ordersmodel.js";

export const createOrder = async (req, res) => {
  try {
    const { items, ...orderData } = req.body;

    
    const userId = req.user.id;

    const order = await OrderModel.create({
      ...orderData,
      user_id: userId,
      created_by: userId,
    });

    for (const item of items) {
      await OrderModel.createOrderItem({
        ...item,
        order_id: order.order_id,
        created_by: userId,
      });
    }

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order_id: order.order_id,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getOrders = async (req, res) => {
  const data = await OrderModel.getAll();
  res.json(data);
};

export const getOrderById = async (req, res) => {
  const userId = req.user.id;
  const orderId = req.params.id;

  const data = await OrderModel.getByIdAndUser(orderId, userId);

  if (!data) {
    return res.status(403).json({ message: "Access denied" });
  }

  res.json(data);
};


export const getMyOrders = async (req, res) => {
  const userId = req.user.id;
  const orders = await OrderModel.getByUser(userId);
  res.json(orders);
};


export const updateOrder = async (req, res) => {
  await OrderModel.update(req.body);
  res.json({ message: "Order updated successfully" });
};

export const deleteOrder = async (req, res) => {
  await OrderModel.delete(req.params.id);
  res.json({ message: "Order deleted successfully" });
};
