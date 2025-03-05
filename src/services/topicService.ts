import { TopicModel, TopicDetailsModel } from "../models/topics.js";
import { getUserProgressById } from "./progressService.js";
import { ProgressStatus } from "../enums/enums.js";
import type { Topic, TopicDetails } from "../types/topics.js";

export const getAllTopics = async (user_id: string): Promise<Topic[]> => {
    try {
        const [topics, userProgress] = await Promise.all([
            TopicModel.find().lean(),
            getUserProgressById(user_id)
        ]);

        const topicsWithStatus = topics.map(topic => ({
            ...topic,
            status: ProgressStatus.PENDING
        }));

        userProgress.progressRecords.forEach(rec => {
            const topic = topicsWithStatus.find(t => t.topic_id === rec.topic_id);
            if (topic) {
                topic.status = rec.status as ProgressStatus;
            }
        });

        return topicsWithStatus;
    } catch (error: unknown) {
        console.error("Service error:", error);
        throw new Error(error instanceof Error ? error.message : "Failed to fetch topics");
    }
};

export const getTopicDetails = async (topic_id: string): Promise<TopicDetails> => {
    try {
        const numericTopicId = Number(topic_id);
        if (isNaN(numericTopicId)) {
            throw new Error(`Invalid topic ID format: ${topic_id}`);
        }

        const topicDetails = await TopicDetailsModel.findOne({ topic_id: numericTopicId }).lean();
        if (!topicDetails) {
            throw new Error(`Topic details with ID ${topic_id} not found`);
        }

        return topicDetails;
    } catch (error: unknown) {
        console.error("Service error:", error);
        throw new Error(error instanceof Error ? error.message : "Failed to fetch topic details");
    }
};
