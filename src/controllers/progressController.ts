import { Request, Response } from "express";
import  {ProgressService} from "../services/progressService.js";

export class ProgressController {
    private progressService: ProgressService;

    constructor() {
        this.progressService = new ProgressService();
    }

    async getUserProgress(req: Request, res: Response): Promise<void> {
        try {
            const user_id = req.params.user_id;
            const response = await this.progressService.getUserProgressById(user_id);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: "Failed to get user progress" });
        }
    }

    async updateUserProgress(req: Request, res: Response): Promise<void> {
        try {
            const { user_id, topic_id, status } = req.body;
            const response = await this.progressService.updateTopicStatus(user_id, topic_id, status);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: "Failed to update progress" });
        }
    }

    async resetUserProgress(req: Request, res: Response): Promise<void> {
        try {
            const { user_id } = req.params;
            if (!user_id) {
                res.status(400).json({ message: "User ID is required" });
                return;
            }
            await this.progressService.resetUserProgressByUserId(user_id);
            res.status(200).json({ status: "success", message: "User progress reset successfully" });
        } catch (error: unknown) {
            res.status(500).json({
                message: error instanceof Error ? error.message : "Failed to reset user progress"
            });
        }
    }
}