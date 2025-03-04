import express from "express";
import { getUserProgress, updateUserProgress } from "../controllers/progressController.js";

const router = express.Router();

router.get("/:user_id", getUserProgress);
router.put("/", updateUserProgress);

export default router;