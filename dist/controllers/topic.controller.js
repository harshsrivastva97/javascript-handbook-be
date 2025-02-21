import { getAllTopics as getTopicsService } from "../services/topic.service.js";
export async function getAllTopicsController(req, res) {
    try {
        const topics = await getTopicsService();
        res.status(200).json({ message: "Topics fetched", topics });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
