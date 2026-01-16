import express from "express";
import {
  createOrder,
  deleteOrder,
  getOrderById,
  getOrders,
  updateOrder,
} from "../controllers/orderscontroller.js";
import { verifyToken } from "../middleware/authmiddleware.js";

const router = express.Router();

router.post("/order",verifyToken, createOrder);
router.get("/", getOrders);
router.get("/my-orders",verifyToken, getOrders);
router.get("/:id",verifyToken, getOrderById);
router.put("/update/:id",verifyToken, updateOrder);
router.delete("/delete/:id",verifyToken, deleteOrder);

export default router;
