import { Request, Response } from "express";
import { getAllTopics, getTopicDetails } from "../services/topicService.js";

export const getAllTopicsController = async (req: Request, res: Response) => {
    try {
        const topics = await getAllTopics();
        res.status(200).json(topics);
    } catch (error) {
        console.error("Controller error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const getTopicById = async (req: Request, res: Response) => {
    const { topic_id } = req.params;
    const topic = await getTopicDetails(topic_id);
    res.status(200).json(topic);
};