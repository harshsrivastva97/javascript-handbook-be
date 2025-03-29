import { Question } from "../models/questions.js";

export class QuestionService {
    static async getQuestions() {
        return await Question.find();
    }
}