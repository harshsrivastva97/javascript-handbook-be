import { Request, Response } from "express";
import { getUserProgressById, updateTopicStatus } from "../services/progressService.js";

export async function getUserProgress(req: Request, res: Response): Promise<void> {
    try {
        const user_id = req.params.user_id;
        const response = await getUserProgressById(user_id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: "Failed to get user progress" });
    }
}

export async function updateUserProgress(req: Request, res: Response): Promise<void> {
    try {
        const { user_id, topic_id, status } = req.body;
        const response = await updateTopicStatus(user_id, topic_id, status);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: "Failed to update progress" });
    }
}