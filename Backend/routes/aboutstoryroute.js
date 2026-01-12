import express from "express";
import aboutStoryController from "../controllers/about_storycontroller.js";


const router = express.Router();

router.post("/create", aboutStoryController.create);
router.get("/", aboutStoryController.getAll);
router.get("/:id", aboutStoryController.getById);
router.put("/about-story/:id", aboutStoryController.update);
router.delete("/about-story/:id", aboutStoryController.hardDelete);

export default router;
