import express from "express";
import productController from "../controllers/productcontroller.js";

const router = express.Router();

router.post("/create", productController.create);
router.get("/", productController.getAll);
router.get("/:id", productController.getById);
router.put("/update/:id", productController.update);
router.delete("/hard-delete/:id", productController.hardDelete);

export default router;
