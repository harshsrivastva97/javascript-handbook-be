import { Router } from "express";
import { UserController } from "../controllers/userController.js";

const router = Router();
const userController = new UserController();

router.post("/register", userController.registerNewUser.bind(userController));
router.get("/:uid", userController.getUserProfile.bind(userController));
router.put("/", userController.updateUserProfile.bind(userController));

export default router;