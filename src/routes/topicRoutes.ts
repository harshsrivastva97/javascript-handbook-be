import { Router } from "express";
import { TopicController } from "../controllers/topicController.js";

const router = Router();
const topicController = new TopicController();

router.get("/list/:user_id", topicController.getAllTopics.bind(topicController));
router.get("/list", topicController.getAllTopics.bind(topicController));
router.get("/content/:topic_id", topicController.getTopicContentById.bind(topicController));

export default router;