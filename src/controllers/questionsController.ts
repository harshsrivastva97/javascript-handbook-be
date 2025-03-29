import { Request, Response } from "express";
import { QuestionService } from "../services/questionService.js";

export class QuestionController {
    static async getQuestions(req: Request, res: Response) {
        const questions = await QuestionService.getQuestions();
        res.status(200).json(questions);
    }
}
