import type { Request, Response } from "express";
import { getAllTopics as getTopicsService } from "../services/topicService.js";

export async function getAllTopicsController(req: Request, res: Response) {
    try {
        const topics = await getTopicsService();
        res.status(200).json({ message: "Topics fetched", topics });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}