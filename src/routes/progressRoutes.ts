import express from "express";
import { updateProgress, getOverallProgress } from "../controllers/progressController.js";
import { authenticateUser } from "../middleware/userMiddleware.js";

const router = express.Router();

router.put("/update", authenticateUser, updateProgress);
router.get("/overall", authenticateUser, getOverallProgress);

export default router;