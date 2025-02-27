import { Router } from "express";
import { registerNewUser, getUserProfile, updateUserProfile } from "../controllers/userController.js";

const router = Router();

router.post("/register", registerNewUser);
router.get("/:uid", getUserProfile);
router.post("/:uid", updateUserProfile);

export default router;