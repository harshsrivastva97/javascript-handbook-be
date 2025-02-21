import { Router } from "express";
import { registerUser, loginUser, googleLogin } from "../controllers/auth.controller.js";
const router = Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/googleSignIn", googleLogin);
export default router;
