import express from "express";
import userController from "../controllers/usercontroller.js";
import { verifyToken } from "../middleware/authmiddleware.js";



const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);

router.get("/",verifyToken,userController.getAll);
router.get("/:id",verifyToken , userController.getById);
router.put("/update/:id",verifyToken , userController.update);
router.delete("/delete/:id",verifyToken ,userController.hardDelete);

export default router;
