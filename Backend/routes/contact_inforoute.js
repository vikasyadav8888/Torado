import express from "express";
import contactInfoController from "../controllers/contact_infocontroller.js";

const router = express.Router();

router.post("/create", contactInfoController.create);
router.get("/", contactInfoController.getAll);
router.get("/:type", contactInfoController.getByType);
router.put("/:id", contactInfoController.update);
router.delete("/:id", contactInfoController.hardDelete);

export default router;
