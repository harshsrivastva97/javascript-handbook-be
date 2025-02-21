import express from "express";
import { updateProgress, getOverallProgress } from "../controllers/progress.controller.js";
import { authenticateUser } from "../middleware/auth.middleware.js";
const router = express.Router();
router.put("/update", authenticateUser, updateProgress);
router.get("/overall", authenticateUser, getOverallProgress);
export default router;
