import prisma from "../db/postgres.js";
import { ProgressStatus } from "../enums/enums.js";
import { UserProgress } from "../types/index.js";

export async function getUserProgressById(userId: string): Promise<{ progressRecords: { topic_id: number, status: string }[] }> {
    try {
        const progressRecords = await prisma.userProgress.findMany({
            select: { topic_id: true, status: true },
            where: { user_id: userId }
        });
        return { 
            progressRecords: progressRecords.map(rec => {
                const numericTopicId = Number(rec.topic_id);
                if (isNaN(numericTopicId)) {
                    throw new Error(`Invalid topic ID format in progress records: ${rec.topic_id}`);
                }
                return { 
                    topic_id: numericTopicId, 
                    status: rec.status 
                };
            }) 
        };
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Failed to fetch overall progress");
    }
}

export async function updateTopicStatus(userId: string, topicId: number, status: ProgressStatus): Promise<UserProgress> {
    try {
        const userProgress = await prisma.userProgress.upsert({
            where: {
                user_id_topic_id: { user_id: userId, topic_id: topicId },
            },
            update: {
                status,
            },
            create: {
                user_id: userId,
                topic_id: topicId,
                status,
            },
        });
        return userProgress;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Failed to update progress");
    }
}