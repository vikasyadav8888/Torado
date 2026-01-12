import express from "express";
import blogParagraphController from "../controllers/blogparagraphcon.js";


const router = express.Router();

router.post("/create", blogParagraphController.create);
router.get("/", blogParagraphController.getAll);
router.get("/:id", blogParagraphController.getById);
router.put("/:id", blogParagraphController.update);
router.delete("/:id", blogParagraphController.hardDelete);

export default router;
