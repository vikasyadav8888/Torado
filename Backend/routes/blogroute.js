import express from "express";
import blogController from "../controllers/blogcontroller.js";


const router = express.Router();

router.post("/create", blogController.create);
router.get("/", blogController.getAll);
router.get("/:id", blogController.getById);
router.put("/:id", blogController.update);
router.delete("/:id", blogController.hardDelete);

export default router;
