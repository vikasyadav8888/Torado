import express from "express";
import categoryController from "../controllers/product_catagory.js";


const router = express.Router();

router.post("/create", categoryController.create);
router.get("/", categoryController.getAll);
router.delete("/hard-delete/:id", categoryController.hardDelete);

export default router;
