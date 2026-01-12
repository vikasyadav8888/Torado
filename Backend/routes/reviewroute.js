import express from "express";
import reviewController from "../controllers/reviewcontroller.js";
import { verifyToken } from "../middleware/authmiddleware.js";


const router = express.Router();

router.post("/create",verifyToken, reviewController.create);
router.get("/",verifyToken, reviewController.getAll);
router.delete("/hard-delete",verifyToken, reviewController.hardDelete);

export default router;
