import express from "express";
import contactController from "../controllers/contactformcontroller.js";
import { verifyToken } from "../middleware/authmiddleware.js";


const router = express.Router();

router.post("/contact", verifyToken , contactController.create);
router.get("/", verifyToken, contactController.getAll);
router.get("/contact/:id", verifyToken , contactController.getById);
router.delete("/contact/:id", verifyToken, contactController.hardDelete);

export default router;
