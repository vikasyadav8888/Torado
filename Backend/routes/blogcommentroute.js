import express from "express";
import blogCommentController from "../controllers/blogcommentcon.js";


const router = express.Router();

router.post("/create", blogCommentController.create);
router.get("/", blogCommentController.getAll);
router.get("/:id", blogCommentController.getById);
router.put("/:id", blogCommentController.update);
router.delete("/:id", blogCommentController.hardDelete);

export default router;
