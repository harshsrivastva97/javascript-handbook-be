import { Router } from "express";
import { getAllTopicsController } from "../controllers/topicController.js";
import { authenticateUser } from "../middleware/userMiddleware.js";

const router = Router();

router.get("/getAllTopics", authenticateUser, getAllTopicsController);

export default router;