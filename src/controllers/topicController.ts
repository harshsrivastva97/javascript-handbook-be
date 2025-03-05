import { Request, Response } from "express";
import { getAllTopics, getTopicDetails } from "../services/topicService.js";

export const getAllTopicsController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { user_id } = req.params;
        if (!user_id) {
            res.status(400).json({ message: "User ID is required" });
            return;
        }
        const topics = await getAllTopics(user_id);
        res.status(200).json(topics);
    } catch (error: unknown) {
        console.error("Controller error:", error);
        res.status(500).json({ 
            message: error instanceof Error ? error.message : "Failed to fetch topics" 
        });
    }
};

export const getTopicById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { topic_id } = req.params;
        if (!topic_id) {
            res.status(400).json({ message: "Topic ID is required" });
            return;
        }
        const topic = await getTopicDetails(topic_id);
        res.status(200).json(topic);
    } catch (error: unknown) {
        console.error("Controller error:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        res.status(error instanceof Error && error.message.includes("not found") ? 404 : 500)
            .json({ message: errorMessage });
    }
};