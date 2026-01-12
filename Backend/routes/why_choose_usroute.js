import express from "express";
import whyChooseUsController from "../controllers/why_choose_controller.js";


const router = express.Router();

router.post("/create", whyChooseUsController.create);
router.get("/", whyChooseUsController.getAll);
router.put("/:id", whyChooseUsController.update);
router.delete("/:id", whyChooseUsController.hardDelete);

export default router;
