import express from "express";
import blogTagMapController from "../controllers/blogtagmapcon.js";


const router = express.Router();

router.post("/create", blogTagMapController.create);
router.get("/", blogTagMapController.getAll);
router.get("/:id", blogTagMapController.getById);
router.put("/:id", blogTagMapController.update);
router.delete("/:id", blogTagMapController.hardDelete);

export default router;
