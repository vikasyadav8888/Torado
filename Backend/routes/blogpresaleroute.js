import express from "express";
import blogPreSaleController from "../controllers/blogpresalecontroller.js";


const router = express.Router();

router.post("/create", blogPreSaleController.create);
router.get("/", blogPreSaleController.getAll);
router.get("/:id", blogPreSaleController.getById);
router.put("/:id", blogPreSaleController.update);
router.delete("/:id", blogPreSaleController.hardDelete);

export default router;
