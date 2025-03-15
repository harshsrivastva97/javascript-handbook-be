import express from "express";
import { ProgressController } from "../controllers/progressController.js";

const router = express.Router();

const progressController = new ProgressController();

router.get("/:user_id", progressController.getUserProgress.bind(progressController));
router.put("/update", progressController.updateUserProgress.bind(progressController));
router.delete("/reset/:user_id", progressController.resetUserProgress.bind(progressController));

export default router;