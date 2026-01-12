import express from "express";
import faqController from "../controllers/faqcontroller.js";
import { verifyToken } from "../middleware/authmiddleware.js";


const router = express.Router();

router.post("/faq",verifyToken, faqController.create);
router.get("/", faqController.getAll);
router.get("/faq/:id", faqController.getById);
router.put("/update/:id",verifyToken, faqController.update);
router.delete("/delete/:id",verifyToken, faqController.hardDelete);

export default router;
