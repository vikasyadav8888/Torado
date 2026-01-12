import express from "express";
import storeLocationController from "../controllers/storelocationcontroller.js";
import { verifyToken } from "../middleware/authmiddleware.js";


const router = express.Router();

router.post("/create",verifyToken, storeLocationController.create);
router.get("/", storeLocationController.getAll);
router.get("/:id", storeLocationController.getById);
router.put("/update/:id",verifyToken, storeLocationController.update);
router.delete("/delete/:id",verifyToken, storeLocationController.hardDelete);

export default router;
