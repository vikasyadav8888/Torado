import express from "express";
import blogCategoryMapController from "../controllers/blogcatagorymapcon.js";


const router = express.Router();

router.post("/createmap", blogCategoryMapController.create);
router.get("/", blogCategoryMapController.getAll);
router.get("/:id", blogCategoryMapController.getById);
router.put("/:id", blogCategoryMapController.update);
router.delete("delete/:id", blogCategoryMapController.hardDelete);

export default router;
