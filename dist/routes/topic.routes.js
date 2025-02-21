import { Router } from "express";
import { getAllTopicsController } from "../controllers/topic.controller.js";
import { authenticateUser } from "../middleware/auth.middleware.js";
const router = Router();
router.get("/getAllTopics", authenticateUser, getAllTopicsController);
export default router;
