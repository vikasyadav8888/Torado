import express from "express";
import teamController from "../controllers/teamcontroller.js";


const router = express.Router();

router.post("/create", teamController.create);
router.get("/", teamController.getAll);
router.get("/:id", teamController.getById);
router.put("update/:id", teamController.update);
router.delete("delete/:id", teamController.hardDelete);

export default router;
