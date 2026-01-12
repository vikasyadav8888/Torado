import express from "express";
import blogAfterSaleController from "../controllers/blogaftersalecon.js";


const router = express.Router();

router.post("/create", blogAfterSaleController.create);
router.get("/", blogAfterSaleController.getAll);
router.get("/:id", blogAfterSaleController.getById);
router.put("/:id", blogAfterSaleController.update);
router.delete("/:id", blogAfterSaleController.hardDelete);

export default router;
