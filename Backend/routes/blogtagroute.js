import express from "express";
import blogTagController from "../controllers/blogtagcontroller.js";


const router = express.Router();

router.post("/create", blogTagController.create);
router.get("/", blogTagController.getAll);
router.get("/:id", blogTagController.getById);
router.put("/:id", blogTagController.update);
router.delete("/:id", blogTagController.hardDelete);

export default router;
