import { TopicModel } from "../models/topicList.js";
import { TopicDetailsModel } from "../models/topicDetails.js";

export const getAllTopics = async () => {
    try {
        return await TopicModel.find().lean();
    } catch (error) {
        throw new Error("Failed to fetch topics");
    }
};

export const getTopicDetails = async (topic_id: string) => {
    try {
        const topicDetails = await TopicDetailsModel.findOne({ topic_id: parseInt(topic_id) }).lean();
        if (!topicDetails) {
            throw new Error(`Topic details with ID ${topic_id} not found`);
        }
        return topicDetails;
    } catch (error) {
        throw new Error(`Failed to fetch topic details: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};
