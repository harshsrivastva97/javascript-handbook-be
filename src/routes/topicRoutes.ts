import { Router } from "express";
import { getAllTopicsController, getTopicById } from "../controllers/topicController.js";

const router = Router();

router.get("/", getAllTopicsController);
router.get("/:topic_id", getTopicById);

export default router;