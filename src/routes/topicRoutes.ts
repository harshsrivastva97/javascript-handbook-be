import { Router } from "express";
import { getAllTopicsController, getTopicById } from "../controllers/topicController.js";

const router = Router();

router.get("/list/:user_id", getAllTopicsController);
router.get("/details/:topic_id", getTopicById);

export default router;