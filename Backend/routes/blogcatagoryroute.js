import express from "express";
import blogCategoryController from "../controllers/blogcatagorycontroller.js";


const router = express.Router();

router.post("/blog_catagory", blogCategoryController.create);
router.get("/", blogCategoryController.getAll);
router.get("/:id", blogCategoryController.getById);
router.put("/:id", blogCategoryController.update);
router.delete("/:id", blogCategoryController.hardDelete);

export default router;
