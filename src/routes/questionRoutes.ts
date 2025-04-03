import express from "express";
import { QuestionController } from "../controllers/questionsController.js";

const router = express.Router();

router.get("/", QuestionController.getQuestions);

export default router;
